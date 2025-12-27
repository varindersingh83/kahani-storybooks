/**
 * Slack notification utility for order notifications
 */

export interface OrderNotificationData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  productPrice: string;
  shippingAddress: string;
  childName?: string;
  childAge?: string;
}

/**
 * Send order notification to Slack via API endpoint (to avoid CORS issues)
 */
export async function sendSlackNotification(orderData: OrderNotificationData): Promise<void> {
  console.log('🔔 sendSlackNotification called with:', orderData);
  
  // Use API endpoint instead of direct webhook to avoid CORS issues
  const apiUrl = import.meta.env.DEV 
    ? 'http://localhost:3001/api/slack-notify'  // Development server
    : '/api/slack-notify';  // Production (Vercel serverless function)
  
  console.log('🔍 Using API endpoint:', apiUrl);

  try {
    console.log('📤 Sending request to API endpoint...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    console.log('📥 Response status:', response.status, response.statusText);

    if (!response.ok) {
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        responseData = { error: await response.text() };
      }
      console.error('❌ API error response:', responseData);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('✅ Slack notification sent successfully! Response:', responseData);
  } catch (error) {
    console.error('❌ Failed to send Slack notification:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    // Don't throw - we don't want to block the order flow if notification fails
  }
}

