"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalProviderProps {
  children: React.ReactNode;
}

export default function PayPalProvider({ children }: PayPalProviderProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
  
  return (
    <PayPalScriptProvider options={{ clientId, currency: "USD" }}>
      {children}
    </PayPalScriptProvider>
  );
}
