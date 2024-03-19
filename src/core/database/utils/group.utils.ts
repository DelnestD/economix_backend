import { EntityNotFoundError } from "../../../api/error/types.error";
import { Group } from "../../models/group.class";
import { DatabaseConnection } from "../connection";

export async function getGroupById(id: string) {
    const foundEntity = await DatabaseConnection.manager.findOne(Group, {
        where: {
            id,
        },
    });

    if (!foundEntity) {
        throw new EntityNotFoundError();
    }

    return foundEntity;
}

export async function insertGroup(body: Object) {
    const group = DatabaseConnection.manager.create(Group, body);
    await DatabaseConnection.manager.save(group);
    return group;
}

export async function updateGroup(id: string, body: Object) {
    const group = await getGroupById(id);
    Object.assign(group, body);
    await DatabaseConnection.manager.save(group);
    return group;
}

export async function deleteGroup(id: string) {
    const group = await getGroupById(id);
    await DatabaseConnection.manager.delete(Group, group);
    return group;
}
