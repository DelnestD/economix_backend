import bcrypt from "bcrypt";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import { LoginFailedError } from "../error/types.error";
import {
    getUserByEmail,
    insertUser,
} from "../../core/database/utils/user.utils";

export const authRouter = Router();

authRouter.post("/login", async (request, response, next) => {
    const { email, password } = request.body;

    const user = await getUserByEmail(email);

    if (!user) {
        return next(new EntityNotFoundError("Mot de passe ou email incorrect"));
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return next(new EntityNotFoundError("Mot de passe ou email incorrect"));
    }

    const accessToken = sign(
        {
            id: user.id,
            iat: Math.floor(new Date().getTime() / 1000),
            exp: Math.floor(new Date().getTime() / 1000 + 300),
        },
        process.env.JWT_SECRET!
    );

    response.cookie("accessToken", accessToken, {
        expires: new Date(Date.now() + 300000),
        httpOnly: true,
    });

    response.send({
        accessToken,
    });
});

authRouter.post("/register", async (request, response, next) => {
    const body = request.body;

    try {
        await getUserByEmail(body.email);
        response.status(409).json({
            message: "Mail exists",
        });
    } catch (error) {
        bcrypt.hash(body.password, 10, (err, hash) => {
            if (err) {
                return response.status(500);
            } else {
                body.password = hash;
                insertUser(body);
                response.status(200).send(body);
            }
        });
    }
});
