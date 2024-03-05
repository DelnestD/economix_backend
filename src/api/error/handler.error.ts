import { type Request, type Response, type NextFunction } from "express";
import { EntityNotFoundError, MissingEnvError, NotFoundError } from "./types.error";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof MissingEnvError) {
        return missingEnvErrorHandler(err, req, res, next);
    }
    if (err instanceof EntityNotFoundError) {
        return entityNotFoundErrorHandler(err, req, res, next);
    }
    if (err instanceof NotFoundError) {
        return notFoundErrorHandler(err, req, res, next);
    }
    return internaleServerErrorHandler(err, req, res, next);
}

function internaleServerErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).send("Something went wrong with the server");
}
function entityNotFoundErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(404).send("Entity not found");
}
function notFoundErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(404).send("Page not found");
}
function missingEnvErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).send("Missing environment variable");
}
