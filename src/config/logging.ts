import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'http',
    }),
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
});

export default logger;
