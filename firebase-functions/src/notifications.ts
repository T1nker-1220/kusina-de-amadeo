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

// Types
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

type EmailTemplate = "orderConfirmation" | "statusUpdate";

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
  orderConfirmation: (data) => ({
    subject: `Order Confirmation #${data.orderId}`,
    html: `
      <h1>Thank you for your order, ${data.customerName}!</h1>
      <p>Your order #${data.orderId} has been received and is being processed.</p>
      ${
        data.items
          ? `
          <h2>Order Details:</h2>
          <ul>
            ${data.items
              .map(
                (item) =>
                  `<li>${item.name} x ${item.quantity} - ₱${item.price}</li>`
              )
              .join("")}
          </ul>
          <p><strong>Total: ₱${data.total}</strong></p>
          `
          : ""
      }
      <p>We'll notify you when your order status changes.</p>
    `,
  }),
  statusUpdate: (data) => ({
    subject: `Order Status Update #${data.orderId}`,
    html: `
      <h1>Order Status Update</h1>
      <p>Dear ${data.customerName},</p>
      <p>Your order #${data.orderId} has been updated:</p>
      <p><strong>${data.statusMessage}</strong></p>
      <p>Thank you for choosing our service!</p>
    `,
  }),
};

// Cloud Function to send emails
export const sendEmail = functions.https.onCall(
  async (data: SendEmailData, context) => {
    try {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "User must be authenticated to send emails."
        );
      }

      const template = emailTemplates[data.template](data.data);

      await transporter.sendMail({
        from: '"Kusina De Amadeo" <noreply@kusinaDeAmadeo.com>',
        to: data.to,
        subject: template.subject,
        html: template.html,
      });

      return {success: true};
    } catch (error) {
      console.error("Error sending email:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error sending email. Please try again later."
      );
    }
  }
);
