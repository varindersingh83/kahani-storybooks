import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get webhook URL from environment variable
  // For Vercel serverless functions, use SLACK_WEBHOOK_URL (without VITE_ prefix)
  // VITE_ prefixed vars are exposed to client-side code
  const webhookUrl = process.env.SLACK_WEBHOOK_URL || process.env.VITE_SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Slack webhook URL not configured');
    return res.status(500).json({ error: 'Slack webhook URL not configured' });
  }

  // Get order data from request body
  const orderData = req.body;

  if (!orderData) {
    return res.status(400).json({ error: 'Order data is required' });
  }

  const shippingAddress = orderData.shippingAddress || 'Not provided';
  const childInfo = orderData.childName 
    ? `\n*Child's Name:* ${orderData.childName}${orderData.childAge ? ` (Age: ${orderData.childAge})` : ''}`
    : '';

  const message = {
    text: "🎉 New Order Received!",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🎉 New Order Received!"
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Order Number:*\n${orderData.orderNumber}`
          },
          {
            type: "mrkdwn",
            text: `*Product:*\n${orderData.productName}`
          },
          {
            type: "mrkdwn",
            text: `*Price:*\n${orderData.productPrice}`
          },
          {
            type: "mrkdwn",
            text: `*Customer Name:*\n${orderData.customerName}`
          },
          {
            type: "mrkdwn",
            text: `*Email:*\n${orderData.customerEmail}`
          },
          {
            type: "mrkdwn",
            text: `*Shipping Address:*\n${shippingAddress}`
          }
        ]
      }
    ]
  };

  // Add child info if available
  if (childInfo) {
    message.blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: childInfo
      }
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Slack API error:', response.status, responseText);
      return res.status(response.status).json({ 
        error: 'Failed to send Slack notification',
        details: responseText
      });
    }

    const responseData = await response.text();
    console.log('Slack notification sent successfully');
    
    return res.status(200).json({ 
      success: true,
      message: 'Notification sent successfully',
      response: responseData
    });

  } catch (error) {
    console.error('Failed to send Slack notification:', error);
    return res.status(500).json({ 
      error: 'Failed to send Slack notification',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

