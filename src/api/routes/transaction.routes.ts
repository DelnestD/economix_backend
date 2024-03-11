import { Router } from "express";
import {
  getTransactionById,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByBudgetId,
  getTransactionsByAccountId,
} from "../../core/database/utils/transaction.utils";
import { authorizeMiddleWare } from "../middlewares/authorize.middleware";

export const transactionRouter = Router();

transactionRouter.get(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const transaction = await getTransactionById(request.params.id);
      response.send(transaction);
    } catch (err) {
      next(err);
    }
  }
);

transactionRouter.get(
  "/budget/:budgetId",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const transaction = await getTransactionsByBudgetId(
        request.params.budgetId
      );
      response.send(transaction);
    } catch (err) {
      next(err);
    }
  }
);

transactionRouter.get(
  "/account/:accountId",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const transaction = await getTransactionsByAccountId(
        request.params.accountId
      );
      response.send(transaction);
    } catch (err) {
      next(err);
    }
  }
);

transactionRouter.post(
  "/",
  authorizeMiddleWare([]),
  async (request, response) => {
    response.send(await insertTransaction(request.body));
  }
);

transactionRouter.patch(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response, next) => {
    try {
      const transaction = await updateTransaction(
        request.params.id,
        request.body
      );
      response.send(transaction);
    } catch (err) {
      next(err);
    }
  }
);

transactionRouter.delete(
  "/:id",
  authorizeMiddleWare([]),
  async (request, response) => {
    await deleteTransaction(request.params.id);
    response.status(204).send(null);
  }
);
