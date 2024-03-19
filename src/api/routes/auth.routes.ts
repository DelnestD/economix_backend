import bcrypt from "bcrypt";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import { LoginFailedError } from "../error/types.error";
import { getUserByEmail, insertUser } from "../../core/database/utils/user.utils";
import { insertAccount } from "../../core/database/utils/account.utils";

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

    const dateUTC1 = Date.now() + 3600000;

    const minutesBeforeExpire = 60;

    const expireDate = new Date(dateUTC1 + minutesBeforeExpire * 60000);

    const accessToken = sign(
        {
            id: user.id,
            iat: Math.floor(dateUTC1 / 1000),
            exp: Math.floor(dateUTC1 / 1000 + minutesBeforeExpire * 60),
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
                insertAccount({ title: "Compte courant", description: "Compte créer par défaut" }).then((account) => {
                    body.accounts = [account];
                    insertUser(body);
                    response.status(200).send(body);
                });
            }
        });
    }
});
