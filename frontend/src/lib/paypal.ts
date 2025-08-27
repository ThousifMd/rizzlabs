export const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

export async function getAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;
  
  console.log('🔑 Getting PayPal access token...');
  console.log('🔑 Client ID:', id ? 'Present' : 'Missing');
  console.log('🔑 Client Secret:', secret ? 'Present' : 'Missing');
  console.log('🔑 API Base:', PAYPAL_API_BASE);
  
  const auth = Buffer.from(`${id}:${secret}`).toString("base64");

  console.log('🔑 Making token request to:', `${PAYPAL_API_BASE}/v1/oauth2/token`);
  
  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
    // Keep this on Node runtime, not Edge
    cache: "no-store",
  });

  console.log('🔑 Token response status:', res.status);
  
  if (!res.ok) {
    const text = await res.text();
    console.error('🔑 Token error:', text);
    throw new Error(`PayPal token error ${res.status}: ${text}`);
  }
  
  const data = await res.json();
  console.log('🔑 Token received successfully');
  return data.access_token;
}
