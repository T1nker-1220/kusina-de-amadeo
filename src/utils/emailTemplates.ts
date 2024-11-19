import { NotificationData } from "@/services/notifications";

export function generateOrderEmailTemplate(data: NotificationData): string {
  const statusColor = getStatusColor(data.status);
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kusina De Amadeo Order Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d97706; margin: 0;">Kusina De Amadeo</h1>
              <p style="color: #666; margin: 10px 0 0;">Order Notification</p>
            </div>

            <!-- Status Badge -->
            <div style="text-align: center; margin-bottom: 25px;">
              <span style="background-color: ${statusColor}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; text-transform: uppercase;">
                ${data.status}
              </span>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 25px;">
              <p style="font-size: 16px; color: #333; margin: 0;">
                ${data.message}
              </p>
            </div>

            <!-- Order Details -->
            <div style="background-color: #f8f8f8; border-radius: 6px; padding: 20px; margin-bottom: 25px;">
              <h2 style="color: #333; margin: 0 0 15px; font-size: 18px;">Order Details</h2>
              <p style="margin: 5px 0; color: #666;">
                <strong>Order ID:</strong> ${data.orderId}
              </p>
              <p style="margin: 5px 0; color: #666;">
                <strong>Status:</strong> ${data.status}
              </p>
              <p style="margin: 5px 0; color: #666;">
                <strong>Date:</strong> ${new Date(data.timestamp).toLocaleString()}
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                This is an automated message from Kusina De Amadeo. Please do not reply to this email.
              </p>
              <p style="color: #888; font-size: 12px; margin: 10px 0 0;">
                © ${new Date().getFullYear()} Kusina De Amadeo. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function getStatusColor(status: string): string {
  const colors: { [key: string]: string } = {
    confirmed: "#059669", // green
    preparing: "#0891b2", // cyan
    ready: "#7c3aed", // purple
    "out_for_delivery": "#ea580c", // orange
    delivered: "#059669", // green
    cancelled: "#dc2626", // red
    default: "#6b7280", // gray
  };

  return colors[status.toLowerCase()] || colors.default;
}
