const isDevelopment = process.env.NODE_ENV === 'development';

type LogArgs = (string | number | boolean | null | undefined | object)[];

export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`, data || '');
    }
  },
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[ERROR] ${message}`, error || '');
    }
    // In production, you could send errors to a monitoring service
  },
  warn: (message: string, data?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[WARN] ${message}`, data || '');
    }
  }
};
