import { EntityNotFoundError } from "../../../api/error/types.error";
import { Transaction } from "../../models/transaction.class";
import { DatabaseConnection } from "../connection";
import { getAccountById } from "./account.utils";
import { getBudgetById } from "./budget.utils";

export async function getTransactionById(id: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(Transaction, {
        where: {
            id,
        },
        relations: ["account", "budget"],
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
        relations: ["account", "budget"],
    });

    if (!foundEntities) {
        throw new EntityNotFoundError();
    }

    return foundEntities;
}

export async function getTransactionsByAccountId(accountId: string) {
    const foundAccount = await getAccountById(accountId);

    const foundEntities = await DatabaseConnection.manager.find(Transaction, {
        where: {
            account: foundAccount,
        },
        order: {
            date: "DESC",
            createdAt: "DESC",
        },
        relations: ["account", "budget"],
    });

    if (!foundEntities) {
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
