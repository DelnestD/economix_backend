import { Router } from "express";
import { getAccountById, insertAccount, updateAccount, deleteAccount } from "../../core/database/utils/account.utils";

export const accountRouter = Router();

accountRouter.get("/:id", async (request, response, next) => {
    try {
        const account = await getAccountById(request.params.id);
        response.send(account);
    } catch (err) {
        next(err);
    }
});

accountRouter.post("/", async (request, response) => {
    response.send(await insertAccount(request.body));
});

accountRouter.patch("/:id", async (request, response, next) => {
    try {
        const account = await updateAccount(request.params.id, request.body);
        response.send(account);
    } catch (err) {
        next(err);
    }
});

accountRouter.delete("/:id", async (request, response) => {
    await deleteAccount(request.params.id);
    response.status(204).send(null);
});
