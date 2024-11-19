import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from 'resend';
import { generateOrderEmailTemplate } from "@/utils/emailTemplates";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.NEXT_PUBLIC_EMAIL_FROM || 'notifications@kusinade-amadeo.com';

export async function POST(request: NextRequest) {
  try {
    const { to, data } = await request.json();

    // Generate email HTML using our template
    const html = generateOrderEmailTemplate(data);

    // Send email using Resend
    const result = await resend.emails.send({
      from: `Kusina De Amadeo <${FROM_EMAIL}>`,
      to: to,
      subject: `Order ${data.status}: ${data.orderId}`,
      html: html,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
