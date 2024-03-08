import { Role, User } from "../models/user.class";
import { Group } from "../models/group.class";
import { DatabaseConnection } from "./connection";

export async function seeder() {
    const manager = DatabaseConnection.manager;

    const simpson = manager.create(Group, {
        name: "Famille Simpson",
    });
    await manager.save(simpson);

    const users = manager.create(User, [
        {
            email: "homer@simpsons.com",
            firstName: "Homer",
            lastName: "Simpson",
            password: "simpson",
            role: Role.LEADER,
            group: simpson,
        },
        {
            email: "marge@simpsons.com",
            firstName: "Marge",
            lastName: "Bouvier",
            password: "simpson",
            role: Role.LEADER,
            group: simpson,
        },
        {
            email: "bart@simpsons.com",
            firstName: "Bart",
            lastName: "Simpson",
            password: "simpson",
            role: Role.MEMBER,
            group: simpson,
        },
        {
            email: "lisa@simpsons.com",
            firstName: "Lisa",
            lastName: "Simpson",
            password: "simpson",
            role: Role.MEMBER,
            group: simpson,
        },
        {
            email: "maggie@simpsons.com",
            firstName: "Maggie",
            lastName: "Simpson",
            password: "simpson",
            role: Role.MEMBER,
            group: simpson,
        },
    ]);
    await manager.save(users);
}
