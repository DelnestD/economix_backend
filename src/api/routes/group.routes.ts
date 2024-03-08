import { Router } from "express";
import { deleteGroup, getGroupById, insertGroup, updateGroup } from "../../core/database/utils/group.utils";

export const groupRouter = Router();

groupRouter.get("/:id", async (request, response, next) => {
    try {
        const group = await getGroupById(request.params.id);
        response.send(group);
    } catch (err) {
        next(err);
    }
});

groupRouter.post("/", async (request, response) => {
    response.send(await insertGroup(request.body));
});

groupRouter.patch("/:id", async (request, response, next) => {
    try {
        const group = await updateGroup(request.params.id, request.body);
        response.send(group);
    } catch (err) {
        next(err);
    }
});

groupRouter.delete("/:id", async (request, response) => {
    await deleteGroup(request.params.id);
    response.status(204).send(null);
});
