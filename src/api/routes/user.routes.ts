import { Router } from "express";
import { deleteUser, getUserById, getUserByEmail, insertUser, updateUser, getUsersByGroupId, getUserAccount } from "../../core/database/utils/user.utils";

export const userRouter = Router();

userRouter.get("/:id", async (request, response, next) => {
    try {
        const user = await getUserById(request.params.id);
        response.send(user);
    } catch (err) {
        next(err);
    }
});

userRouter.get("/email/:email", async (request, response, next) => {
    try {
        const user = await getUserByEmail(request.params.email);
        response.send(user);
    } catch (err) {
        next(err);
    }
});

userRouter.get("/group/:groupId", async (request, response, next) => {
    try {
        const users = await getUsersByGroupId(request.params.groupId);
        response.send(users);
    } catch (err) {
        next(err);
    }
});

userRouter.get("/account/:id", async (request, response, next) => {
    try {
        const user = await getUserAccount(request.params.id);
        response.send(user);
    } catch (err) {
        next(err);
    }
});

userRouter.get("/budget/:id", async (request, response, next) => {
    try {
        const user = await getUserBudget(request.params.id);
        response.send(user);
    } catch (err) {
        next(err);
    }
});

userRouter.post("/", async (request, response) => {
    response.send(await insertUser(request.body));
});

userRouter.patch("/:id", async (request, response, next) => {
    try {
        const user = await updateUser(request.params.id, request.body);
        response.send(user);
    } catch (err) {
        next(err);
    }
});

userRouter.delete("/:id", async (request, response) => {
    await deleteUser(request.params.id);
    response.status(204).send(null);
});
function getUserBudget(id: string) {
    throw new Error("Function not implemented.");
}
