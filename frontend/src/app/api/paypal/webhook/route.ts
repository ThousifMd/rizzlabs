import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        // For first tests, just log and 200 OK.
        // Later, verify the signature using PayPal's verify API and act on events.
        const event = await req.json().catch(() => null);
        console.log("PayPal webhook:", event?.event_type, event?.resource?.id);

        // Examples to handle later:
        // PAYMENT.CAPTURE.COMPLETED -> mark order paid
        // PAYMENT.CAPTURE.DENIED    -> fail fulfilment
        // PAYMENT.CAPTURE.REFUNDED -> handle refunds

        if (event?.event_type === "PAYMENT.CAPTURE.COMPLETED") {
            console.log("Payment completed:", event.resource.id);
            // TODO: Update database with payment status
            // TODO: Send confirmation email
            // TODO: Trigger AI processing
        }

        if (event?.event_type === "PAYMENT.CAPTURE.DENIED") {
            console.log("Payment denied:", event.resource.id);
            // TODO: Handle failed payment
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("PayPal webhook error:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
