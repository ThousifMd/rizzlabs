// PayPal API configuration
// Switch between sandbox and live based on environment
const PAYPAL_API_BASE = process.env.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com'           // LIVE (real money)
    : 'https://api-m.sandbox.paypal.com';  // SANDBOX (fake money)

export { PAYPAL_API_BASE };

// Get PayPal access token
export async function getAccessToken(): Promise<string> {
    // Use production credentials in production, sandbox in development
    const clientId = process.env.NODE_ENV === 'production'
        ? process.env.PAYPAL_CLIENT_ID
        : process.env.SANDBOX_PAYPAL_CLIENT_ID;

    const clientSecret = process.env.NODE_ENV === 'production'
        ? process.env.PAYPAL_SECRET_KEY
        : process.env.SANDBOX_PAYPAL_SECRET_KEY;

    // Debug logging
    console.log('🔍 PayPal Debug:');
    console.log('  NODE_ENV:', process.env.NODE_ENV);
    console.log('  Using credentials for:', process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX');
    console.log('  Client ID exists:', !!clientId);
    console.log('  Client Secret exists:', !!clientSecret);
    console.log('  API Base:', PAYPAL_API_BASE);

    if (!clientId || !clientSecret) {
        const missingCreds = [];
        if (!clientId) missingCreds.push(process.env.NODE_ENV === 'production' ? 'PAYPAL_CLIENT_ID' : 'SANDBOX_PAYPAL_CLIENT_ID');
        if (!clientSecret) missingCreds.push(process.env.NODE_ENV === 'production' ? 'PAYPAL_SECRET_KEY' : 'SANDBOX_PAYPAL_SECRET_KEY');
        throw new Error(`PayPal credentials not found: ${missingCreds.join(', ')}`);
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
