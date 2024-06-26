import { NextFunction, RequestHandler, Response, Request } from "express";
import { getUserById } from "../../core/database/utils/user.utils";
import { verify } from "jsonwebtoken";

export function authorizeMiddleWare(roles: string[]): RequestHandler {
  return async (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies.accessToken;

    if (!token) {
      return response.status(401).send("Unauthorized");
    }

    try {
      const accessTokenDecoded = verify(token, process.env.JWT_SECRET!, {
        complete: true,
      });

      const user = await getUserById(accessTokenDecoded.payload.sub as string);

      if (!user || !user.role) {
        return response.status(403).send("Forbidden");
      }

      if (roles.length > 0 && !roles.includes(user.role)) {
        return response.status(403).send("Forbidden");
      }
    } catch (e) {
      return response.status(401).send("Unauthorized");
    }

    next();
  };
}
