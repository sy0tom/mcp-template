type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

const currentLogLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info";

const shouldLog = (level: LogLevel): boolean => {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLogLevel];
};

const formatMessage = (level: LogLevel, message: string, meta?: unknown): string => {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : "";
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
};

/**
 * Simple structured logger
 */
export const logger = {
  debug: (message: string, meta?: unknown): void => {
    if (shouldLog("debug")) {
      console.debug(formatMessage("debug", message, meta));
    }
  },

  info: (message: string, meta?: unknown): void => {
    if (shouldLog("info")) {
      console.info(formatMessage("info", message, meta));
    }
  },

  warn: (message: string, meta?: unknown): void => {
    if (shouldLog("warn")) {
      console.warn(formatMessage("warn", message, meta));
    }
  },

  error: (message: string, error?: unknown, meta?: unknown): void => {
    if (shouldLog("error")) {
      const metaObject = meta && typeof meta === "object" && !Array.isArray(meta) ? meta : {};
      const errorMeta =
        error instanceof Error
          ? { error: error.message, stack: error.stack, ...metaObject }
          : { error: String(error), ...metaObject };
      console.error(formatMessage("error", message, errorMeta));
    }
  }
};
