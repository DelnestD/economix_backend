import { Role, User } from "../models/user.class";
import { Group } from "../models/group.class";
import { DatabaseConnection } from "./connection";

export async function seeder() {
    const manager = DatabaseConnection.manager;

    const simpson = manager.create(Group, [
        {
            name: "Famille Simpson",
        },
    ]);
    await manager.save(simpson);

    const users = manager.create(User, [
        {
            email: "homer@simpsons.com",
            firstName: "Homer",
            lastName: "Simpson",
            role: Role.LEADER,
            groupe: simpson,
        },
        {
            email: "marge@simpsons.com",
            firstName: "Marge",
            lastName: "Bouvier",
            role: Role.LEADER,
            groupe: simpson,
        },
        {
            email: "bart@simpsons.com",
            firstName: "Bart",
            lastName: "Simpson",
            role: Role.MEMBER,
            groupe: simpson,
        },
        {
            email: "lisa@simpsons.com",
            firstName: "Lisa",
            lastName: "Simpson",
            role: Role.MEMBER,
            groupe: simpson,
        },
        {
            email: "maggie@simpsons.com",
            firstName: "Maggie",
            lastName: "Simpson",
            role: Role.MEMBER,
            groupe: simpson,
        },
    ]);
    await manager.save(users);
}
