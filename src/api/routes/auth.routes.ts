import bcrypt from "bcrypt";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import { LoginFailedError } from "../error/types.error";
import { getUserByEmail, insertUser } from "../../core/database/utils/user.utils";

export const authRouter = Router();

authRouter.post("/login", async (request, response, next) => {
    const { email, password } = request.body;

    const user = await getUserByEmail(email);

    if (!user) {
        return next(new LoginFailedError("Email ou mot de passe incorrect"));
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return next(new LoginFailedError("Email ou mot de passe incorrect"));
    }

    const expireDate = new Date(Date.now() + 300000);

    const accessToken = sign(
        {
            id: user.id,
            iat: Math.floor(new Date().getTime() / 1000),
            exp: Math.floor(new Date().getTime() / 1000 + 300),
        },
        process.env.JWT_SECRET!
    );

    response.cookie("accessToken", accessToken, {
        expires: expireDate,
        httpOnly: true,
    });

    response.send({
        accessToken,
        expires: expireDate,
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
