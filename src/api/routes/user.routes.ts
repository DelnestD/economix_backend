import { Router } from "express";
import {
  deleteUser,
  getUserById,
  getUserByEmail,
  insertUser,
  updateUser,
  getUsersByGroupId,
  getUserAccounts,
  getUserBudgets,
} from "../../core/database/utils/user.utils";
import { authorizeMiddleWare } from "../middlewares/authorize.middleware";

export const userRouter = Router();

userRouter.get(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const user = await getUserById(request.params.id);
      response.send(user);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  "/email/:email",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const user = await getUserByEmail(request.params.email);
      response.send(user);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  "/group/:groupId",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const users = await getUsersByGroupId(request.params.groupId);
      response.send(users);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  "/account/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const user = await getUserAccounts(request.params.id);
      response.send(user);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  "/budget/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const user = await getUserBudgets(request.params.id);
      response.send(user);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.post("/", authorizeMiddleWare([]), async (request, response) => {
  response.send(await insertUser(request.body));
});

userRouter.patch(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const user = await updateUser(request.params.id, request.body);
      response.send(user);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.delete(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response) => {
    await deleteUser(request.params.id);
    response.status(204).send(null);
  }
);
function getUserBudget(id: string) {
  throw new Error("Function not implemented.");
}
