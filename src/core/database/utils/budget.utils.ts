import { EntityNotFoundError } from "../../../api/error/types.error";
import { Budget } from "../../models/budget.class";
import { DatabaseConnection } from "../connection";
import { getUserById } from "./user.utils";

export async function getBudgetById(id: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(Budget, {
        where: {
            id,
        },
    });

    if (!foundEntity) {
        throw new EntityNotFoundError();
    }

    return foundEntity;
}

export async function getBudgetByUserId(userId: string) {
    const foundUser = await getUserById(userId);

    const foundEntities = await DatabaseConnection.manager.find(Budget, {
        where: {
            user: foundUser,
        },
    });

    if (!foundEntities || foundEntities.length === 0) {
        throw new EntityNotFoundError();
    }

    return foundEntities;
}

export async function insertBudget(body: Object) {
    const budget = DatabaseConnection.manager.create(Budget, body);
    await DatabaseConnection.manager.save(budget);
    return budget;
}

export async function updateBudget(id: string, body: Object) {
    const budget = await getBudgetById(id);
    Object.assign(budget, body);
    await DatabaseConnection.manager.save(budget);
    return budget;
}

export async function deleteBudget(id: string) {
    const budget = await getBudgetById(id);
    await DatabaseConnection.manager.delete(Budget, budget);
    return budget;
}
