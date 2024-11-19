import * as functions from "firebase-functions";
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
        ${data.items?.map((item) => `
          <li>${item.name} x ${item.quantity} - $${item.price.toFixed(2)}</li>
        `).join("")}
      </ul>
      <p><strong>Total:</strong> $${data.total?.toFixed(2)}</p>
      <p>We'll notify you when your order is ready.</p>
    `,
  }),
  "order-update": (data: EmailTemplateData) => ({
    subject: `Order Update: #${data.orderId}`,
    html: `
      <h2>Order Status Update</h2>
      <p>Dear ${data.customerName},</p>
      <p>Your order #${data.orderId} has been updated:</p>
      <p><strong>${data.statusMessage}</strong></p>
      <p>Thank you for choosing Kusina De Amadeo!</p>
    `,
  }),
};

// Cloud Function to send emails
export const sendEmail = functions.https.onCall(async (request) => {
  try {
    const data = request.data as SendEmailData;
    
    if (!data || !data.to || !data.template || !data.data) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing required email parameters"
      );
    }

    const template = emailTemplates[data.template](data.data);

    await transporter.sendMail({
      from: '"Kusina De Amadeo" <noreply@kusinaDeAmadeo.com>',
      to: data.to,
      subject: template.subject,
      html: template.html,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to send email"
    );
  }
});
