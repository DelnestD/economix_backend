import { Role, User } from "../models/user.class";
import { Group } from "../models/group.class";
import { DatabaseConnection } from "./connection";
import { Budget } from "../models/budget.class";
import { Transaction } from "../models/transaction.class";

export async function seeder() {
    const manager = DatabaseConnection.manager;

    const [homer, marge, bart, lisa, maggie] = manager.create(User, [
        {
            email: "homer@simpsons.com",
            firstName: "Homer",
            lastName: "Simpson",
            password: "simpson",
            role: Role.LEADER,
            group: null,
        },
        {
            email: "marge@simpsons.com",
            firstName: "Marge",
            lastName: "Bouvier",
            password: "simpson",
            role: Role.LEADER,
            group: null,
        },
        {
            email: "bart@simpsons.com",
            firstName: "Bart",
            lastName: "Simpson",
            password: "simpson",
            role: Role.MEMBER,
            group: null,
        },
        {
            email: "lisa@simpsons.com",
            firstName: "Lisa",
            lastName: "Simpson",
            password: "simpson",
            role: Role.MEMBER,
            group: null,
        },
        {
            email: "maggie@simpsons.com",
            firstName: "Maggie",
            lastName: "Simpson",
            password: "simpson",
            role: Role.MEMBER,
            group: null,
        },
    ]);
    await manager.save([homer, marge, bart, lisa, maggie]);

    const [homerAccount, margeAccount, bartAccount, lisaAccount, maggieAccount] = manager.create(Budget, [
        {
            title: "Compte courant",
            description: "compte courant d'homer",
            amount: 1000,
            user: homer,
        },
        {
            title: "Compte courant",
            description: "compte courant de marge",
            amount: 1000,
            user: marge,
        },
        {
            title: "Compte courant",
            description: "compte courant de bart",
            amount: 100,
            user: bart,
        },
        {
            title: "Compte courant",
            description: "compte courant de lisa",
            amount: 100,
            user: lisa,
        },
        {
            title: "Compte courant",
            description: "compte courant de maggie",
            amount: 300,
            user: maggie,
        },
    ]);

    await manager.save([homerAccount, margeAccount, bartAccount, lisaAccount, maggieAccount]);

    const simpson = manager.create(Group, {
        name: "Famille Simpson",
    });
    await manager.save(simpson);

    homer.group = simpson;
    marge.group = simpson;
    bart.group = simpson;
    lisa.group = simpson;
    maggie.group = simpson;
    await manager.save([homer, marge, bart, lisa, maggie]);

    const transaction = manager.create(Transaction, [
        {
            title: "Salaire",
            amount: 1000,
            date: new Date("2024-03-08"),
            budget: homerAccount,
        },
        {
            title: "Argent de Poche",
            amount: 1000,
            date: new Date("2024-03-08"),
            budget: margeAccount,
        },
        {
            title: "Argent de Poche",
            amount: 100,
            date: new Date("2024-03-08"),
            budget: bartAccount,
        },
        {
            title: "Argent de Poche",
            amount: 100,
            date: new Date("2024-03-08"),
            budget: lisaAccount,
        },
        {
            title: "Argent de Poche",
            amount: 300,
            date: new Date("2024-03-08"),
            budget: maggieAccount,
        },
    ]);

    await manager.save(transaction);
}
