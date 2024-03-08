import { EntityNotFoundError } from "../../../api/error/types.error";
import { Transaction } from "../../models/transaction.class";
import { DatabaseConnection } from "../connection";
import { getBudgetById, getBudgetByUserId } from "./budget.utils";

export async function getTransactionById(id: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(Transaction, {
        where: {
            id,
        },
    });

    if (!foundEntity) {
        throw new EntityNotFoundError();
    }

    return foundEntity;
}

export async function getTransactionsByBudgetId(budgetId: string) {
    const foundBudget = await getBudgetById(budgetId);

    const foundEntities = await DatabaseConnection.manager.find(Transaction, {
        where: {
            budget: foundBudget,
        },
        order: {
            date: "DESC",
            createdAt: "DESC",
        },
    });

    if (!foundEntities || foundEntities.length === 0) {
        throw new EntityNotFoundError();
    }

    return foundEntities;
}

export async function getTransactionsByUserId(userId: string) {
    const foundBudgets = await getBudgetByUserId(userId);
    console.log(foundBudgets);
    const foundEntities = [];
    for (const budget of foundBudgets) {
        const transactions = await DatabaseConnection.manager.find(Transaction, {
            where: {
                budget,
            },
            order: {
                date: "DESC",
                createdAt: "DESC",
            },
        });
        foundEntities.push(...transactions);
    }
    console.log(foundEntities);
    if (foundEntities.length === 0) {
        throw new EntityNotFoundError();
    }

    return foundEntities;
}

export async function insertTransaction(body: Object) {
    const transaction = DatabaseConnection.manager.create(Transaction, body);
    await DatabaseConnection.manager.save(transaction);
    return transaction;
}

export async function updateTransaction(id: string, body: Object) {
    const transaction = await getTransactionById(id);
    Object.assign(transaction, body);
    await DatabaseConnection.manager.save(transaction);
    return transaction;
}

export async function deleteTransaction(id: string) {
    const transaction = await getTransactionById(id);
    await DatabaseConnection.manager.delete(Transaction, transaction);
    return transaction;
}
