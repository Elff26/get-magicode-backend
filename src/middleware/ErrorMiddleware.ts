import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";

function errorMiddleware(httpError: HttpError, request: Request, response: Response, next: NextFunction) {
    const statusCode = httpError.statusCode || 500;
    const message = httpError.message || 'Ops! Something is wrong. Try again later!';

    response.status(statusCode).json({
        statusCode,
        message
    });
}

export default errorMiddleware;