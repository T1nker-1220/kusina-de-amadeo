import { httpsCallable } from 'firebase/functions';
import { functions } from '@/config/firebase';
import { logger } from '@/utils/logger';

interface EmailNotification {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

interface SMSNotification {
  to: string;
  message: string;
}

interface OrderNotificationData {
  orderId: string;
  status: string;
  customerName: string;
  estimatedDeliveryTime?: string;
  items?: Array<{ name: string; quantity: number }>;
  total?: number;
  driverInfo?: {
    name: string;
    phone: string;
  };
}

export const sendEmailNotification = async (notification: EmailNotification) => {
  try {
    const sendEmail = httpsCallable(functions, 'sendEmail');
    const result = await sendEmail(notification);
    return result.data;
  } catch (error) {
    logger.error('Error sending email notification:', error);
    throw error;
  }
};

export const sendSMSNotification = async (notification: SMSNotification) => {
  try {
    const sendSMS = httpsCallable(functions, 'sendSMS');
    const result = await sendSMS(notification);
    return result.data;
  } catch (error) {
    logger.error('Error sending SMS notification:', error);
    throw error;
  }
};

export const sendOrderConfirmationNotification = async (
  email: string,
  phone: string,
  data: OrderNotificationData
) => {
  const { orderId, customerName, items, total } = data;
  
  const emailPromise = sendEmailNotification({
    to: email,
    subject: `Order Confirmation: #${orderId}`,
    template: 'order-confirmation',
    data: {
      orderId,
      customerName,
      items,
      total,
      timestamp: new Date().toISOString(),
    },
  });

  const smsPromise = sendSMSNotification({
    to: phone,
    message: `Thank you for your order #${orderId}! We'll notify you when it's confirmed. Track your order at: ${process.env.NEXT_PUBLIC_WEBSITE_URL}/orders/${orderId}`,
  });

  return Promise.all([emailPromise, smsPromise]);
};

export const sendOrderUpdateNotification = async (
  email: string,
  phone: string,
  data: OrderNotificationData
) => {
  const { orderId, status, estimatedDeliveryTime, driverInfo } = data;
  
  let statusMessage = '';
  switch (status) {
    case 'confirmed':
      statusMessage = 'Your order has been confirmed and is being prepared.';
      break;
    case 'preparing':
      statusMessage = 'Your order is now being prepared in our kitchen.';
      break;
    case 'out_for_delivery':
      statusMessage = `Your order is out for delivery! Your driver ${driverInfo?.name} (${driverInfo?.phone}) is on the way.`;
      break;
    case 'delivered':
      statusMessage = 'Your order has been delivered. Enjoy your meal!';
      break;
    case 'cancelled':
      statusMessage = 'Your order has been cancelled.';
      break;
    default:
      statusMessage = `Your order status has been updated to: ${status}`;
  }

  const emailPromise = sendEmailNotification({
    to: email,
    subject: `Order Update: #${orderId}`,
    template: 'order-update',
    data: {
      orderId,
      status,
      statusMessage,
      estimatedDeliveryTime,
      driverInfo,
      timestamp: new Date().toISOString(),
    },
  });

  const smsPromise = sendSMSNotification({
    to: phone,
    message: `${statusMessage}${estimatedDeliveryTime ? ` Estimated delivery: ${estimatedDeliveryTime}.` : ''} Track at: ${process.env.NEXT_PUBLIC_WEBSITE_URL}/orders/${orderId}`,
  });

  return Promise.all([emailPromise, smsPromise]);
};

export const sendDeliveryAssignedNotification = async (
  email: string,
  phone: string,
  data: OrderNotificationData
) => {
  const { orderId, driverInfo, estimatedDeliveryTime } = data;

  if (!driverInfo) {
    throw new Error('Driver information is required for delivery notification');
  }

  const emailPromise = sendEmailNotification({
    to: email,
    subject: `Delivery Driver Assigned: Order #${orderId}`,
    template: 'delivery-assigned',
    data: {
      orderId,
      driverName: driverInfo.name,
      driverPhone: driverInfo.phone,
      estimatedDeliveryTime,
      timestamp: new Date().toISOString(),
    },
  });

  const smsPromise = sendSMSNotification({
    to: phone,
    message: `Your order #${orderId} will be delivered by ${driverInfo.name} (${driverInfo.phone}). ETA: ${estimatedDeliveryTime}. Track at: ${process.env.NEXT_PUBLIC_WEBSITE_URL}/orders/${orderId}`,
  });

  return Promise.all([emailPromise, smsPromise]);
};
