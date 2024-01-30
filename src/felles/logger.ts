import { Request } from 'express';
import * as fs from 'fs';
import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.json(),
        }),
    ],
});

const secureLogPath = () =>
    fs.existsSync('/secure-logs/') ? '/secure-logs/secure.log' : './secure.log';

export const secureLogger = winston.createLogger({
    format: winston.format.json(),
    level: 'info',
    transports: [new winston.transports.File({ filename: secureLogPath(), maxsize: 5242880 })],
});

const prefix = (req: Request) => {
    return `${req.method} - ${req.originalUrl}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const utledMetadata = (req: Request, error?: any) => {
    const callId = req.header('nav-call-id');
    const requestId = req.header('x-request-id');

    return {
        ...(callId ? { x_callId: callId } : {}),
        ...(requestId ? { x_requestId: requestId } : {}),
        ...(error ? { error: error } : {}),
    };
};

export const logInfo = (message: string, req: Request) => {
    const melding = `${prefix(req)}: ${message}`;
    const meta = utledMetadata(req);

    logger.info(melding, meta);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logWarn = (message: string, req: Request, error?: any) => {
    const melding = `${prefix(req)}: ${message}`;
    const meta = utledMetadata(req, error);

    logger.warn(melding, meta);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logError = (message: string, req: Request, error?: any) => {
    const melding = `${prefix(req)}: ${message}`;
    const meta = utledMetadata(req, error);

    logger.error(melding, meta);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logSecureInfo = (message: string, req: Request, error?: any) => {
    secureLogger.info(message, utledMetadata(req, error));
};

export default logger;
