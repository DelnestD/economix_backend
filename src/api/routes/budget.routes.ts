import { Router } from "express";
import { getBudgetById, insertBudget, updateBudget, deleteBudget, getBudgetByUserId } from "../../core/database/utils/budget.utils";

export const budgetRouter = Router();

budgetRouter.get("/:id", async (request, response, next) => {
    try {
        const budget = await getBudgetById(request.params.id);
        response.send(budget);
    } catch (err) {
        next(err);
    }
});

budgetRouter.get("/user/:userId", async (request, response, next) => {
    try {
        const budget = await getBudgetByUserId(request.params.userId);
        response.send(budget);
    } catch (err) {
        next(err);
    }
});

budgetRouter.post("/", async (request, response) => {
    response.send(await insertBudget(request.body));
});

budgetRouter.patch("/:id", async (request, response, next) => {
    try {
        const budget = await updateBudget(request.params.id, request.body);
        response.send(budget);
    } catch (err) {
        next(err);
    }
});

budgetRouter.delete("/:id", async (request, response) => {
    await deleteBudget(request.params.id);
    response.status(204).send(null);
});
