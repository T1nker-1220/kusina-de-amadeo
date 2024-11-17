import {onCall} from "firebase-functions/v2/https";
import * as nodemailer from "nodemailer";
import {defineString} from "firebase-functions/params";

// Define config parameters
const smtpUser = defineString("smtp.user");
const smtpPass = defineString("smtp.pass");

// Initialize nodemailer with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpUser.value(),
    pass: smtpPass.value(),
  },
});

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface EmailTemplateData {
  orderId: string;
  customerName: string;
  items?: OrderItem[];
  total?: number;
  statusMessage?: string;
}

type EmailTemplate = "order-confirmation" | "order-update";

interface SendEmailData {
  to: string;
  template: EmailTemplate;
  data: EmailTemplateData;
}

// Email templates
const emailTemplates: Record<
  EmailTemplate,
  (data: EmailTemplateData) => { subject: string; html: string }
> = {
  "order-confirmation": (data: EmailTemplateData) => ({
    subject: `Order Confirmation: #${data.orderId}`,
    html: `
      <h2>Thank you for your order, ${data.customerName}!</h2>
      <p>Your order #${data.orderId} has been received.</p>
      <h3>Order Details:</h3>
      <ul>
      ${data.items
        ?.map((item) => 
          `<li>${item.quantity}x ${item.name}</li>`
        )
        .join("")}
      </ul>
      <p><strong>Total:</strong> ₱${data.total?.toFixed(2)}</p>
      <p>We'll notify you when your order is ready for delivery.</p>
    `,
  }),
  "order-update": (data: EmailTemplateData) => ({
    subject: `Order Update: #${data.orderId}`,
    html: `
      <h2>Order Status Update</h2>
      <p>${data.statusMessage}</p>
    `,
  }),
};

export const sendEmail = onCall<SendEmailData>(async (request) => {
  try {
    const {data} = request;
    const {to, template, data: templateData} = data;

    if (!to || !template || !templateData) {
      throw new Error("Missing required email parameters");
    }

    const emailTemplate = emailTemplates[template];
    if (!emailTemplate) {
      throw new Error(`Email template "${template}" not found`);
    }

    const {subject, html} = emailTemplate(templateData);

    const mailOptions = {
      from: `Kusina De Amadeo <${smtpUser.value()}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);

    return {success: true};
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email notification");
  }
});

// Test function to verify email setup
export const testEmail = onCall(async () => {
  try {
    await transporter.sendMail({
      from: `Kusina De Amadeo <${smtpUser.value()}>`,
      to: smtpUser.value(),
      subject: "Test Email from Kusina De Amadeo",
      html: `
        <h2>Test Email</h2>
        <p>If you're seeing this, your email configuration is working!</p>
        <p>Time sent: ${new Date().toLocaleString()}</p>
      `,
    });

    return {success: true, message: "Test email sent!"};
  } catch (error) {
    console.error("Error sending test email:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send test email"
    );
  }
});
