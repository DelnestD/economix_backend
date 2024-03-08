import { EntityNotFoundError } from "../../../api/error/types.error";
import { User } from "../../models/user.class";
import { DatabaseConnection } from "../connection";

export async function getUserById(id: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(User, {
        where: {
            id,
        },
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
    });

    if (!foundEntity) {
        throw new EntityNotFoundError();
    }

    return foundEntity;
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