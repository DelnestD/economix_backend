import { Router } from "express";
import {
  getBudgetById,
  insertBudget,
  updateBudget,
  deleteBudget,
} from "../../core/database/utils/budget.utils";
import { authorizeMiddleWare } from "../middlewares/authorize.middleware";

export const budgetRouter = Router();

budgetRouter.get(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const budget = await getBudgetById(request.params.id);
      response.send(budget);
    } catch (err) {
      next(err);
    }
  }
);

budgetRouter.post("/", authorizeMiddleWare([]), async (request, response) => {
  response.send(await insertBudget(request.body));
});

budgetRouter.patch(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const budget = await updateBudget(request.params.id, request.body);
      response.send(budget);
    } catch (err) {
      next(err);
    }
  }
);

budgetRouter.delete(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response) => {
    await deleteBudget(request.params.id);
    response.status(204).send(null);
  }
);
