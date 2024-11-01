import { createLogger, format, info, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';

interface LogParams {
  message?: string;
  context?: string;
  requestId?: string;
  metadata?: Record<string, any>;
}

interface LogFormat extends LogParams {
  timestamp?: string;
  level?: string;
}

interface ICustomWinstonLogger {
  info: (message: string, params?: LogFormat) => void;
  error: (message: string, params?: LogFormat) => void;
}

class CustomWinstonLogger implements ICustomWinstonLogger {
  private logger: Logger;

  constructor() {
    const formatPrint = format.printf(({ timestamp, level, context, requestId, message, metadata }: LogFormat) => {
      return `${timestamp}::${level}::${context}::${requestId }::${message} ${JSON.stringify(metadata)}`;
    });

    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        formatPrint
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: '%DATE%.info.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '1m',
          maxFiles: '14d',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            formatPrint
          ),
          level: 'info'
        }),
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: '%DATE%.error.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '1m',
          maxFiles: '14d',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            formatPrint
          ),
          level: 'error'
        })
      ]
    })
  }

  private createLogObject(message: string, params?: LogFormat): LogFormat {
    return Object.assign({
      message
    }, params);
  }  

  info(message: string, params?: LogFormat): void {
    this.logger.info(this.createLogObject(message, params));
  }

  error(message: string, params?: LogFormat): void {
    this.logger.error(this.createLogObject(message, params));
  }
}

const logger = new CustomWinstonLogger();

export { logger };