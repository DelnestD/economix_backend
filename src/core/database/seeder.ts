import { Role, User } from "../models/user.class";
import { Group } from "../models/group.class";
import { DatabaseConnection } from "./connection";
import { Budget } from "../models/budget.class";
import { Transaction } from "../models/transaction.class";

export async function seeder() {
    const manager = DatabaseConnection.manager;

    const simpson = manager.create(Group, {
        name: "Famille Simpson",
    });
    await manager.save(simpson);

    const [homerAddTransaction, margeAddTransaction, bartAddTransaction, lisaAddTransaction, maggieAddTransaction] = manager.create(Transaction, [
        {
            title: "Salaire",
            amount: 1000,
            date: new Date("2024-03-08"),
        },
        {
            title: "Argent de Poche",
            amount: 1000,
            date: new Date("2024-03-08"),
        },
        {
            title: "Argent de Poche",
            amount: 100,
            date: new Date("2024-03-08"),
        },
        {
            title: "Argent de Poche",
            amount: 100,
            date: new Date("2024-03-08"),
        },
        {
            title: "Argent de Poche",
            amount: 300,
            date: new Date("2024-03-08"),
        },
    ]);

    await manager.save([homerAddTransaction, margeAddTransaction, bartAddTransaction, lisaAddTransaction, maggieAddTransaction]);

    const [homerAccount, margeAccount, bartAccount, lisaAccount, maggieAccount] = manager.create(Budget, [
        {
            title: "Compte courant",
            description: "compte courant d'homer",
            amount: 1000,
            transactions: [homerAddTransaction],
        },
        {
            title: "Compte courant",
            description: "compte courant de marge",
            amount: 1000,
            transactions: [margeAddTransaction],
        },
        {
            title: "Compte courant",
            description: "compte courant de bart",
            amount: 100,
            transactions: [bartAddTransaction],
        },
        {
            title: "Compte courant",
            description: "compte courant de lisa",
            amount: 100,
            transactions: [lisaAddTransaction],
        },
        {
            title: "Compte courant",
            description: "compte courant de maggie",
            amount: 300,
            transactions: [maggieAddTransaction],
        },
    ]);

    await manager.save([homerAccount, margeAccount, bartAccount, lisaAccount, maggieAccount]);

    const users = manager.create(User, [
        {
            email: "homer@simpsons.com",
            firstName: "Homer",
            lastName: "Simpson",
            password: "simpson",
            role: Role.LEADER,
            group: simpson,
            budgets: [homerAccount],
        },
        {
            email: "marge@simpsons.com",
            firstName: "Marge",
            lastName: "Bouvier",
            password: "simpson",
            role: Role.LEADER,
            group: simpson,
            budgets: [margeAccount],
        },
        {
            email: "bart@simpsons.com",
            firstName: "Bart",
            lastName: "Simpson",
            password: "simpson",
            role: Role.MEMBER,
            group: simpson,
            budgets: [bartAccount],
        },
        {
            email: "lisa@simpsons.com",
            firstName: "Lisa",
            lastName: "Simpson",
            password: "simpson",
            role: Role.MEMBER,
            group: simpson,
            budgets: [lisaAccount],
        },
        {
            email: "maggie@simpsons.com",
            firstName: "Maggie",
            lastName: "Simpson",
            password: "simpson",
            role: Role.MEMBER,
            group: simpson,
            budgets: [maggieAccount],
        },
    ]);
    await manager.save(users);
}
