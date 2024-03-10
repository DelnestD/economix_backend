import { EntityNotFoundError } from "../../../api/error/types.error";
import { Account } from "../../models/account.class";
import { DatabaseConnection } from "../connection";
import { getUserById } from "./user.utils";

export async function getAccountById(id: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(Account, {
        where: {
            id,
        },
    });

    if (!foundEntity) {
        throw new EntityNotFoundError();
    }

    return foundEntity;
}

export async function getAccountByUserId(userId: string) {
    const foundUser = await getUserById(userId);

    const foundEntities = await DatabaseConnection.manager.find(Account, {
        where: {
            user: foundUser,
        },
    });

    if (!foundEntities || foundEntities.length === 0) {
        throw new EntityNotFoundError();
    }

    return foundEntities;
}

export async function insertAccount(body: Object) {
    const account = DatabaseConnection.manager.create(Account, body);
    await DatabaseConnection.manager.save(account);
    return account;
}

export async function updateAccount(id: string, body: Object) {
    const account = await getAccountById(id);
    Object.assign(account, body);
    await DatabaseConnection.manager.save(account);
    return account;
}

export async function deleteAccount(id: string) {
    const account = await getAccountById(id);
    await DatabaseConnection.manager.delete(Account, account);
    return account;
}
