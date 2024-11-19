import { getItem, setItem } from "@/utils/storage";

export interface NotificationData {
  orderId: string;
  status: string;
  message: string;
  timestamp: number;
  isRead?: boolean;
  [key: string]: any;
}

const NOTIFICATIONS_KEY = 'kda_notifications';
const MAX_NOTIFICATIONS = 50; // Limit stored notifications to prevent localStorage overflow

// In-app notifications storage
export function storeNotification(notification: NotificationData) {
  try {
    const notifications = getStoredNotifications();
    notifications.unshift(notification);
    
    // Keep only the latest MAX_NOTIFICATIONS
    const trimmed = notifications.slice(0, MAX_NOTIFICATIONS);
    setItem(NOTIFICATIONS_KEY, trimmed);
  } catch (error) {
    console.error('Error storing notification:', error);
  }
}

export function getStoredNotifications(): NotificationData[] {
  return getItem<NotificationData[]>(NOTIFICATIONS_KEY, []);
}

export function markNotificationAsRead(orderId: string) {
  try {
    const notifications = getStoredNotifications();
    const updated = notifications.map(notif => 
      notif.orderId === orderId ? { ...notif, isRead: true } : notif
    );
    setItem(NOTIFICATIONS_KEY, updated);
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
}

export function clearNotifications() {
  setItem(NOTIFICATIONS_KEY, []);
}

// Email notifications
export async function sendEmailNotification(to: string, data: NotificationData) {
  try {
    const response = await fetch("/api/notifications/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, data }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email notification");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending email notification:", error);
    throw error;
  }
}

// Combined notification functions
export async function sendOrderConfirmation(to: string, orderId: string) {
  const notification = {
    orderId,
    status: "confirmed",
    message: "Your order has been confirmed!",
    timestamp: Date.now(),
    isRead: false,
  };

  // Store notification in-app
  storeNotification(notification);
  
  // Send email notification
  return sendEmailNotification(to, notification);
}

export async function sendOrderStatusUpdate(to: string, orderId: string, status: string) {
  const notification = {
    orderId,
    status,
    message: `Your order status has been updated to: ${status}`,
    timestamp: Date.now(),
    isRead: false,
  };

  // Store notification in-app
  storeNotification(notification);
  
  // Send email notification
  return sendEmailNotification(to, notification);
}

export async function sendDeliveryUpdate(to: string, orderId: string, status: string) {
  const notification = {
    orderId,
    status,
    message: `Delivery status update: ${status}`,
    timestamp: Date.now(),
    isRead: false,
  };

  // Store notification in-app
  storeNotification(notification);
  
  // Send email notification
  return sendEmailNotification(to, notification);
}
