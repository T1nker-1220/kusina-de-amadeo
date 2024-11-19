import * as functions from "firebase-functions";
import cors from "cors";

const corsMiddleware = cors({ origin: true });

export const sendEmail = functions.https.onRequest((request, response) => {
  return corsMiddleware(request, response, async () => {
    try {
      if (request.method !== "POST") {
        response.status(405).send("Method Not Allowed");
        return;
      }

      const { to, data } = request.body;

      // TODO: Implement email sending logic
      // For now, just log the request
      console.log("Sending email to:", to, "with data:", data);

      response.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      response.status(500).json({
        success: false,
        error: "Failed to send email",
      });
    }
  });
});

export const sendSMS = functions.https.onRequest((request, response) => {
  return corsMiddleware(request, response, async () => {
    try {
      if (request.method !== "POST") {
        response.status(405).send("Method Not Allowed");
        return;
      }

      const { to, data } = request.body;

      // TODO: Implement SMS sending logic
      // For now, just log the request
      console.log("Sending SMS to:", to, "with data:", data);

      response.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending SMS:", error);
      response.status(500).json({
        success: false,
        error: "Failed to send SMS",
      });
    }
  });
});
