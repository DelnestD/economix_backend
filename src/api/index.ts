import express, { Application, json } from "express";
import { NotFoundError } from "./error/types.error";
import { errorHandler } from "./error/handler.error";
import { userRouter } from "./routes/user.routes";
import { groupRouter } from "./routes/group.routes";
import { budgetRouter } from "./routes/budget.routes";
import { transactionRouter } from "./routes/transaction.routes";
import { accountRouter } from "./routes/account.routes";
import { authRouter } from "./routes/auth.routes";

const PORT = 8081;

export function initApi() {
    const application: Application = express();
    application.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        );
        next();
    });
    application.use(json());
    application.use("/auth", authRouter);
    application.use("/user", userRouter);
    application.use("/group", groupRouter);
    application.use("/account", accountRouter);
    application.use("/budget", budgetRouter);
    application.use("/transaction", transactionRouter);
    application.use((request, response, next) => {
        throw new NotFoundError();
    });
    application.use(errorHandler);

    application.listen(PORT, () => {
        console.log(`Prêt et à l\'écoute sur http://localhost:${PORT}`);
    });
}
