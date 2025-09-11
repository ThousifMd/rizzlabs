// PayPal API configuration
// Switch between sandbox and live based on environment
const PAYPAL_API_BASE = process.env.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com'           // LIVE (real money)
    : 'https://api-m.sandbox.paypal.com';  // SANDBOX (fake money)

export { PAYPAL_API_BASE };

// Get PayPal access token
export async function getAccessToken(): Promise<string> {
    const clientId = process.env.SANDBOX_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.SANDBOX_PAYPAL_SECRET_KEY;

    if (!clientId || !clientSecret) {
        throw new Error('PayPal credentials not found in environment variables');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get PayPal access token: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
}
