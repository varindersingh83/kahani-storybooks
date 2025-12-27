/**
 * Simple Express server for development
 * Proxies Slack notification requests to avoid CORS issues
 */

import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
function loadEnvFile() {
  try {
    const envPath = join(__dirname, '.env.local');
    const envContent = readFileSync(envPath, 'utf-8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('Error reading .env.local file:', error.message);
    return {};
  }
}

const app = express();
const PORT = 3001;

// Load env vars
const envVars = loadEnvFile();
const webhookUrl = envVars.VITE_SLACK_WEBHOOK_URL || process.env.VITE_SLACK_WEBHOOK_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', webhookConfigured: !!webhookUrl });
});

// Slack notification endpoint
app.post('/api/slack-notify', async (req, res) => {
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Slack webhook URL not configured' });
  }

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
    console.log('✅ Slack notification sent successfully');
    
    return res.status(200).json({ 
      success: true,
      message: 'Notification sent successfully',
      response: responseData
    });

  } catch (error) {
    console.error('❌ Failed to send Slack notification:', error);
    return res.status(500).json({ 
      error: 'Failed to send Slack notification',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Development server running on http://localhost:${PORT}`);
  console.log(`📡 Slack webhook configured: ${webhookUrl ? '✅ Yes' : '❌ No'}`);
});

