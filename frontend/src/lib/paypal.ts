// PayPal API configuration
// Force live environment if we have live credentials (client ID starts with AQugau6LvQ)
const isLiveCredentials = process.env.PAYPAL_CLIENT_ID?.startsWith('AQugau6LvQ');
const PAYPAL_API_BASE = isLiveCredentials
    ? 'https://api-m.paypal.com'  // Live environment
    : 'https://api-m.sandbox.paypal.com';  // Sandbox environment

export { PAYPAL_API_BASE };

// Get PayPal access token
export async function getAccessToken(): Promise<string> {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

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
        throw new Error(`Failed to get PayPal access token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
}
