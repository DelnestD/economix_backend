import { Router } from "express";
import {
  deleteGroup,
  getGroupById,
  insertGroup,
  updateGroup,
} from "../../core/database/utils/group.utils";
import { authorizeMiddleWare } from "../middlewares/authorize.middleware";

export const groupRouter = Router();

groupRouter.get(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const group = await getGroupById(request.params.id);
      response.send(group);
    } catch (err) {
      next(err);
    }
  }
);

groupRouter.post("/", authorizeMiddleWare([]), async (request, response) => {
  response.send(await insertGroup(request.body));
});

groupRouter.patch(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const group = await updateGroup(request.params.id, request.body);
      response.send(group);
    } catch (err) {
      next(err);
    }
  }
);

groupRouter.delete(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response) => {
    await deleteGroup(request.params.id);
    response.status(204).send(null);
  }
);
