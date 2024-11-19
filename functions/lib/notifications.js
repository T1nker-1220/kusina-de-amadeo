"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = exports.sendEmail = void 0;
const functions = __importStar(require("firebase-functions"));
const cors_1 = __importDefault(require("cors"));
const corsMiddleware = (0, cors_1.default)({ origin: true });
exports.sendEmail = functions.https.onRequest((request, response) => {
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
        }
        catch (error) {
            console.error("Error sending email:", error);
            response.status(500).json({
                success: false,
                error: "Failed to send email",
            });
        }
    });
});
exports.sendSMS = functions.https.onRequest((request, response) => {
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
        }
        catch (error) {
            console.error("Error sending SMS:", error);
            response.status(500).json({
                success: false,
                error: "Failed to send SMS",
            });
        }
    });
});
//# sourceMappingURL=notifications.js.map