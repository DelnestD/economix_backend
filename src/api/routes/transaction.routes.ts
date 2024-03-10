import { Router } from "express";
import {
    getTransactionById,
    insertTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByBudgetId,
    getTransactionsByAccountId,
} from "../../core/database/utils/transaction.utils";

export const transactionRouter = Router();

transactionRouter.get("/:id", async (request, response, next) => {
    try {
        const transaction = await getTransactionById(request.params.id);
        response.send(transaction);
    } catch (err) {
        next(err);
    }
});

transactionRouter.get("/budget/:budgetId", async (request, response, next) => {
    try {
        const transaction = await getTransactionsByBudgetId(request.params.budgetId);
        response.send(transaction);
    } catch (err) {
        next(err);
    }
});

transactionRouter.get("/account/:accountId", async (request, response, next) => {
    try {
        const transaction = await getTransactionsByAccountId(request.params.accountId);
        response.send(transaction);
    } catch (err) {
        next(err);
    }
});

transactionRouter.post("/", async (request, response) => {
    response.send(await insertTransaction(request.body));
});

transactionRouter.patch("/:id", async (request, response, next) => {
    try {
        const transaction = await updateTransaction(request.params.id, request.body);
        response.send(transaction);
    } catch (err) {
        next(err);
    }
});

transactionRouter.delete("/:id", async (request, response) => {
    await deleteTransaction(request.params.id);
    response.status(204).send(null);
});
