import express, { Application, json } from "express";
import { NotFoundError } from "./error/types.error";
import { errorHandler } from "./error/handler.error";
import { userRouter } from "./routes/user.routes";
import { groupRouter } from "./routes/group.routes";

const PORT = 8081;

export function initApi() {
    const application: Application = express();
    application.use(json());
    application.use("/user", userRouter);
    application.use("/group", groupRouter);
    application.use((request, response, next) => {
        throw new NotFoundError();
    });
    application.use(errorHandler);

    application.listen(PORT, () => {
        console.log(`Prêt et à l\'écoute sur http://localhost:${PORT}`);
    });
}
