const isDevelopment = process.env.NODE_ENV === 'development';

type LogArgs = (string | number | boolean | null | undefined | object)[];

export const logger = {
  log: (message: string, ...args: LogArgs) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(message, ...args);
    }
  },
  error: (message: string, error?: Error | unknown) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.error(message, error);
    }
    // In production, you could send errors to a monitoring service
  },
  warn: (message: string, ...args: LogArgs) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.warn(message, ...args);
    }
  },
  info: (message: string, ...args: LogArgs) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.info(message, ...args);
    }
  }
};
