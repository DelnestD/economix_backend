import { EntityNotFoundError } from "../../../api/error/types.error";
import { User } from "../../models/user.class";
import { DatabaseConnection } from "../connection";
import { getGroupById } from "./group.utils";

export async function getUserById(id: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(User, {
        where: {
            id,
        },
        relations: ["group"],
    });

    if (!foundEntity) {
        throw new EntityNotFoundError();
    }

    return foundEntity;
}

export async function getUserByEmail(email: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(User, {
        where: {
            email,
        },
        relations: ["group"],
    });

    if (!foundEntity) {
        throw new EntityNotFoundError();
    }

    return foundEntity;
}

export async function getUsersByGroupId(groupId: string) {
    const foundGroup = await getGroupById(groupId);

    const foundEntities = await DatabaseConnection.manager.find(User, {
        where: {
            group: foundGroup,
        },
    });

    if (!foundEntities || foundEntities.length === 0) {
        throw new EntityNotFoundError();
    }

    return foundEntities;
}

export async function getUserAccounts(id: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(User, {
        where: {
            id,
        },
        relations: ["accounts"],
    });

    if (!foundEntity) {
        throw new EntityNotFoundError();
    }

    return foundEntity.accounts;
}

export async function getUserBudgets(id: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(User, {
        where: {
            id,
        },
        relations: ["budgets"],
    });

    if (!foundEntity) {
        throw new EntityNotFoundError();
    }

    return foundEntity.budgets;
}

export async function insertUser(body: Object) {
    const user = DatabaseConnection.manager.create(User, body);
    await DatabaseConnection.manager.save(user);
    return user;
}

export async function updateUser(id: string, body: Object) {
    const user = await getUserById(id);
    Object.assign(user, body);
    await DatabaseConnection.manager.save(user);
    return user;
}

export async function deleteUser(id: string) {
    const user = await getUserById(id);
    await DatabaseConnection.manager.delete(User, user);
    return user;
}
