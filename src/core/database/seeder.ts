import { Role, User } from "../models/user.class";
import { Group } from "../models/group.class";
import { DatabaseConnection } from "./connection";
import { Budget } from "../models/budget.class";
import { Transaction } from "../models/transaction.class";
import { Account } from "../models/account.class";

export async function seeder() {
    const manager = DatabaseConnection.manager;

    //? famille leblond

    const [patrick, andrea, françois] = manager.create(User, [
        {
            lastName: "Leblond",
            firstName: "Patrick",
            email: "patrick.leblond@triptok.be",
            password: "$2a$10$j/v57yS2XTg9tDaXDNYH0u2mwUjpOZsY6MMyJV2DEs9gd9zSkvBSK",
            group: null,
        },
        {
            lastName: "Cefora",
            firstName: "Andrea",
            email: "andrea.cefora@live.be",
            password: "$2a$10$DZf0loOx4LfGdtUUmCtv8OJzb0RUuVGqH03zr.sugcMqrUTuY7cpa",
            group: null,
        },
        {
            lastName: "Leblond",
            firstName: "François",
            email: "françois.leblond@gmail.com",
            password: "$2a$10$p6Cn4orPK.HV4k6FXRNKG.pIMZknFPRE7sJzfwZral1HmqnoZyUbC",
            group: null,
        },
    ]);

    await manager.save([patrick, andrea, françois]);

    const [patrickAccount, andreaAccount, françoisAccount] = manager.create(Account, [
        {
            title: "Compte courant",
            description: "Compte créer par défaut",
        },
        {
            title: "Compte courant",
            description: "Compte créer par défaut",
        },
        {
            title: "Compte courant",
            description: "Compte créer par défaut",
        },
    ]);

    await manager.save([patrickAccount, andreaAccount, françoisAccount]);

    patrick.accounts = [patrickAccount];
    andrea.accounts = [andreaAccount];
    françois.accounts = [françoisAccount];

    await manager.save([patrick, andrea, françois]);

    const leblond = manager.create(Group, {
        name: "Leblond",
    });

    await manager.save(leblond);

    patrick.group = leblond;
    patrick.role = Role.LEADER;
    andrea.group = leblond;
    andrea.role = Role.LEADER;
    françois.group = leblond;
    françois.role = Role.MEMBER;
    await manager.save([patrick, andrea, françois]);

    const transaction = manager.create(Transaction, [
        {
            title: "Salaire",
            amount: 1000,
            date: new Date("2024-03-08"),
            account: patrickAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Salaire",
            amount: 1000,
            date: new Date("2024-03-08"),
            account: andreaAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Argent de Poche",
            amount: 100,
            date: new Date("2024-03-08"),
            account: françoisAccount,
            budget: null,
            isRefill: false,
        },
    ]);

    await manager.save(transaction);

    const budgets = manager.create(Budget, [
        {
            title: "Sortie",
            description: "Sortie entre amis",
            users: [françois],
        },
        {
            title: "Courses",
            description: "Courses de la semaine",
            users: [patrick],
        },
        {
            title: "Maison",
            description: "Dépenses pour la maison",
            users: [andrea],
        },
    ]);

    await manager.save(budgets);

    patrick.budgets = [budgets[1]];
    andrea.budgets = [budgets[2]];
    françois.budgets = [budgets[0]];
    await manager.save([patrick, andrea, françois]);

    const transactions = manager.create(Transaction, [
        {
            title: "Sortie",
            amount: -50,
            date: new Date("2024-03-08"),
            account: françoisAccount,
            budget: budgets[0],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Maison",
            amount: -1000,
            date: new Date("2024-03-08"),
            account: andreaAccount,
            budget: budgets[2],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Courses",
            amount: -300,
            date: new Date("2024-03-08"),
            account: patrickAccount,
            budget: budgets[1],
            isRefill: true,
        },
        {
            title: "cinema",
            amount: -20,
            date: new Date("2024-03-10"),
            account: françoisAccount,
            budget: budgets[0],
            isRefill: false,
        },
        {
            title: "deco",
            amount: -200,
            date: new Date("2024-03-09"),
            account: andreaAccount,
            budget: budgets[2],
            isRefill: false,
        },
        {
            title: "courses",
            amount: -100,
            date: new Date("2024-03-08"),
            account: patrickAccount,
            budget: budgets[1],
            isRefill: false,
        },
    ]);

    await manager.save(transactions);

    //? collocation

    //? solo

    //? solo
}
