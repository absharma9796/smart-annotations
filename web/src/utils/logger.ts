interface ILogger {
    log(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
  }
  
function productionLogger(): ILogger {
  return {
    log: (...args): void => {},
    info: (...args): void => {},
    debug: (...args): void => {},
    warn: (...args): void => {
      console.warn(...args);
    },
    error: (...args): void => {
      console.error(...args);
    },
  };
}

function developmentLogger(): ILogger {
  return {
    log: (...args): void => {
      args.unshift('%c[LOG] ', 'color: #5a5');
      console.log(...args);
    },
    info: (...args): void => {
      args.unshift('%c[INFO] ', 'color: #88f');
      console.info(...args);
    },
    debug: (...args): void => {
      args.unshift('%c[DEBUG] ', 'color: #80f');
      console.debug(...args);
    },
    warn: (...args): void => {
      args.unshift('%c[WARN] ', 'color: #f80');
      console.warn(...args);
    },
    error: (...args): void => {
      args.unshift('%c[ERROR] ', 'color: #f00');
      console.error(...args);
    },
  };
}

export const getLogger = (): ILogger =>
  (process.env.NEXT_PUBLIC_APP_ENV === "production"
    ? productionLogger
    : developmentLogger)();

const logger = getLogger();
export default logger;