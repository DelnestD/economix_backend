import { Role, User } from "../models/user.class";
import { Group } from "../models/group.class";
import { DatabaseConnection } from "./connection";
import { Budget } from "../models/budget.class";
import { Transaction } from "../models/transaction.class";
import { Account } from "../models/account.class";

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

    const [homerAccount, margeAccount, communAccount, bartAccount, lisaAccount, maggieAccount] = manager.create(Account, [
        {
            title: "Compte courant",
            description: "compte courant d'homer",
        },
        {
            title: "Compte courant",
            description: "compte courant de marge",
        },
        {
            title: "Compte Commun",
            description: "Compte commun de la famille Simpson",
        },
        {
            title: "Compte courant",
            description: "compte courant de bart",
        },
        {
            title: "Compte courant",
            description: "compte courant de lisa",
        },
        {
            title: "Compte courant",
            description: "compte courant de maggie",
        },
    ]);

    await manager.save([homerAccount, margeAccount, communAccount, bartAccount, lisaAccount, maggieAccount]);

    homer.accounts = [homerAccount, communAccount];
    marge.accounts = [margeAccount, communAccount];
    bart.accounts = [bartAccount];
    lisa.accounts = [lisaAccount];
    maggie.accounts = [maggieAccount];

    await manager.save([homer, marge, bart, lisa, maggie]);

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
            account: homerAccount,
            budget: null,
        },
        {
            title: "Argent de Poche",
            amount: 1000,
            date: new Date("2024-03-08"),
            account: margeAccount,
            budget: null,
        },
        {
            title: "Argent Courses + Factures",
            amount: 4000,
            date: new Date("2024-03-08"),
            account: communAccount,
            budget: null,
        },
        {
            title: "Argent de Poche",
            amount: 100,
            date: new Date("2024-03-08"),
            account: bartAccount,
            budget: null,
        },
        {
            title: "Argent de Poche",
            amount: 100,
            date: new Date("2024-03-08"),
            account: lisaAccount,
            budget: null,
        },
        {
            title: "Argent de Poche",
            amount: 300,
            date: new Date("2024-03-08"),
            account: maggieAccount,
            budget: null,
        },
    ]);

    await manager.save(transaction);

    const budgets = manager.create(Budget, [
        {
            title: "Moe's Tavern",
            description: "Bar de Moe",
            amount: 500,
            users: [homer],
        },
        {
            title: "Courses",
            description: "Courses de Marge",
            amount: 2500,
            users: [homer, marge],
        },
    ]);

    await manager.save(budgets);

    homer.budgets = [budgets[0], budgets[1]];
    marge.budgets = [budgets[1]];
    await manager.save([homer, marge]);

    const transactions = manager.create(Transaction, [
        {
            title: "Moe",
            amount: 500,
            date: new Date("2024-03-08"),
            account: homerAccount,
            budget: budgets[0],
        },
        {
            title: "Courses",
            amount: 2500,
            date: new Date("2024-03-08"),
            account: communAccount,
            budget: budgets[1],
        },
        {
            title: "ardoise Moe",
            amount: -100,
            date: new Date("2024-03-08"),
            account: homerAccount,
            budget: budgets[0],
        },
    ]);

    await manager.save(transactions);
}
