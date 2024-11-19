import * as admin from "firebase-admin";
import { sendEmail, sendSMS } from "./notifications";

admin.initializeApp();

export {
  sendEmail,
  sendSMS,
};
