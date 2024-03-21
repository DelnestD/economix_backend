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
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "Cefora",
            firstName: "Andrea",
            email: "andrea.cefora@live.be",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "Leblond",
            firstName: "François",
            email: "francois.leblond@gmail.com",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
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
            amount: 2700,
            date: new Date("2024-03-08"),
            account: patrickAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Salaire",
            amount: 2500,
            date: new Date("2024-03-08"),
            account: andreaAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Argent de Poche de François",
            amount: -100,
            date: new Date("2024-03-08"),
            account: patrickAccount,
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

    const [brenda, audrey, maxime] = manager.create(User, [
        {
            lastName: "Lebrun",
            firstName: "Brenda",
            email: "brenda.lebrun@hotmail.com",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "Larousse",
            firstName: "Audrey",
            email: "audrey.larousse@gmail.com",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "Lamenace",
            firstName: "Maxime",
            email: "maxou.lamenace@outlook.com",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
    ]);

    await manager.save([brenda, audrey, maxime]);

    const [brendaAccount, audreyAccount, maximeAccount] = manager.create(Account, [
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

    await manager.save([brendaAccount, audreyAccount, maximeAccount]);

    brenda.accounts = [brendaAccount];
    audrey.accounts = [audreyAccount];
    maxime.accounts = [maximeAccount];

    await manager.save([brenda, audrey, maxime]);

    const collocation = manager.create(Group, {
        name: "La colo'",
    });

    await manager.save(collocation);

    brenda.group = collocation;
    brenda.role = Role.LEADER;
    audrey.group = collocation;
    audrey.role = Role.LEADER;
    maxime.group = collocation;
    maxime.role = Role.LEADER;

    await manager.save([brenda, audrey, maxime]);

    const transactionCollocation = manager.create(Transaction, [
        {
            title: "Salaire",
            amount: 2700,
            date: new Date("2024-03-08"),
            account: brendaAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Salaire",
            amount: 2500,
            date: new Date("2024-03-08"),
            account: audreyAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Salaire",
            amount: 2500,
            date: new Date("2024-03-08"),
            account: maximeAccount,
            budget: null,
            isRefill: false,
        },
    ]);

    await manager.save(transactionCollocation);

    const budgetsCollocation = manager.create(Budget, [
        {
            title: "Courses",
            description: "Courses de la semaine",
            users: [brenda],
        },
        {
            title: "Maison",
            description: "Dépenses pour la maison",
            users: [audrey],
        },
        {
            title: "Sortie",
            description: "Sortie entre amis",
            users: [maxime],
        },
    ]);

    await manager.save(budgetsCollocation);

    brenda.budgets = [budgetsCollocation[0]];
    audrey.budgets = [budgetsCollocation[1]];
    maxime.budgets = [budgetsCollocation[2]];

    await manager.save([brenda, audrey, maxime]);

    const transactionsCollocation = manager.create(Transaction, [
        {
            title: "Reapprovisionnement Courses",
            amount: -300,
            date: new Date("2024-03-08"),
            account: brendaAccount,
            budget: budgetsCollocation[0],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Maison",
            amount: -1000,
            date: new Date("2024-03-08"),
            account: audreyAccount,
            budget: budgetsCollocation[1],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Sortie",
            amount: -200,
            date: new Date("2024-03-08"),
            account: maximeAccount,
            budget: budgetsCollocation[2],
            isRefill: true,
        },
        {
            title: "cinema",
            amount: -20,
            date: new Date("2024-03-10"),
            account: maximeAccount,
            budget: budgetsCollocation[2],
            isRefill: false,
        },
        {
            title: "deco",
            amount: -200,
            date: new Date("2024-03-09"),
            account: audreyAccount,
            budget: budgetsCollocation[1],
            isRefill: false,
        },
        {
            title: "courses",
            amount: -100,
            date: new Date("2024-03-08"),
            account: brendaAccount,
            budget: budgetsCollocation[0],
            isRefill: false,
        },
    ]);

    await manager.save(transactionsCollocation);

    //? solo

    const denis = manager.create(User, {
        lastName: "Lamalice",
        firstName: "Denis",
        email: "denis.lamalice@outlook.com",
        password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
        group: null,
    });

    await manager.save(denis);

    const denisAccount = manager.create(Account, {
        title: "Compte courant",
        description: "Compte créer par défaut",
    });

    await manager.save(denisAccount);

    denis.accounts = [denisAccount];

    await manager.save(denis);

    const transactionDenis = manager.create(Transaction, {
        title: "Salaire",
        amount: 2300,
        date: new Date("2024-03-08"),
        account: denisAccount,
        budget: null,
        isRefill: false,
    });

    await manager.save(transactionDenis);

    const budgetsDenis = manager.create(Budget, [
        {
            title: "Jeux",
            description: "piou piou piou",
            users: [denis],
        },
        {
            title: "Farces",
            description: "Courses de la semaine",
            users: [denis],
        },
    ]);

    await manager.save(budgetsDenis);

    denis.budgets = [budgetsDenis[0], budgetsDenis[1]];

    await manager.save(denis);

    const transactionsDenis = manager.create(Transaction, [
        {
            title: "Reapprovisionnement Jeux",
            amount: -100,
            date: new Date("2024-03-08"),
            account: denisAccount,
            budget: budgetsDenis[0],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Farces",
            amount: -300,
            date: new Date("2024-03-08"),
            account: denisAccount,
            budget: budgetsDenis[1],
            isRefill: true,
        },
        {
            title: "nouveau jeu",
            amount: -50,
            date: new Date("2024-03-10"),
            account: denisAccount,
            budget: budgetsDenis[0],
            isRefill: false,
        },
        {
            title: "Farces",
            amount: -20,
            date: new Date("2024-03-09"),
            account: denisAccount,
            budget: budgetsDenis[1],
            isRefill: false,
        },
        {
            title: "COMIX",
            amount: -300,
            date: new Date("2024-03-20"),
            account: denisAccount,
            budget: null,
            isRefill: false,
        },
    ]);

    await manager.save(transactionsDenis);

    //? solo

    const romain = manager.create(User, {
        lastName: "Laloutre",
        firstName: "Romain",
        email: "romain.laloutre@triptok.be",
        password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
        group: null,
    });

    await manager.save(romain);

    const romainAccount = manager.create(Account, {
        title: "Compte courant",
        description: "Compte créer par défaut",
    });

    await manager.save(romainAccount);

    romain.accounts = [romainAccount];

    await manager.save(romain);

    const transactionRomain = manager.create(Transaction, {
        title: "Salaire",
        amount: 2700,
        date: new Date("2024-03-08"),
        account: romainAccount,
        budget: null,
        isRefill: false,
    });

    await manager.save(transactionRomain);

    const budgetsRomain = manager.create(Budget, [
        {
            title: "Banane",
            description: "Car il faut avoir la banane",
            users: [romain],
        },
        {
            title: "Zoo",
            description: "Loutre <3",
            users: [romain],
        },
    ]);

    await manager.save(budgetsRomain);

    romain.budgets = [budgetsRomain[0], budgetsRomain[1]];

    await manager.save(romain);

    const transactionsRomain = manager.create(Transaction, [
        {
            title: "Reapprovisionnement Banane",
            amount: -200,
            date: new Date("2024-03-08"),
            account: romainAccount,
            budget: budgetsRomain[0],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Zoo",
            amount: -100,
            date: new Date("2024-03-08"),
            account: romainAccount,
            budget: budgetsRomain[1],
            isRefill: true,
        },
        {
            title: "Banane",
            amount: -20,
            date: new Date("2024-03-12"),
            account: romainAccount,
            budget: budgetsRomain[0],
            isRefill: false,
        },
        {
            title: "Zoo",
            amount: -50,
            date: new Date("2024-03-13"),
            account: romainAccount,
            budget: budgetsRomain[1],
            isRefill: false,
        },
    ]);

    await manager.save(transactionsRomain);

    //? lien avec comix de l'autre groupe
    //? famille ch'nord (petite huguette)
    const [huguette, hector, henry, kevin, jeanEudes, gneeeeeh] = manager.create(User, [
        {
            lastName: "la Petite",
            firstName: "Huguette",
            email: "la-petite-huguette@yahoo.fr",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "ch'nord",
            firstName: "Hector",
            email: "Hector-du-nord@nordExpress.fr",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "ch'nord",
            firstName: "Henry",
            email: "Henry-chanteur@nordExpress.fr",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "ch'nord",
            firstName: "Kevin",
            email: "johnny-du-59@keketuning.fr",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "ch'nord",
            firstName: "Jean-Eudes",
            email: "je86@TS21.fr",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "ch'nord",
            firstName: "Gneeeeeh",
            email: "gneeeeeh@TS21.fr",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
    ]);

    await manager.save([huguette, hector, henry, kevin, jeanEudes, gneeeeeh]);

    const [huguetteAccount, hectorAccount, henryAccount, kevinAccount, jeanEudesAccount, gneeeeehAccount] = manager.create(Account, [
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

    await manager.save([huguetteAccount, hectorAccount, henryAccount, kevinAccount, jeanEudesAccount, gneeeeehAccount]);

    huguette.accounts = [huguetteAccount];
    hector.accounts = [hectorAccount];
    henry.accounts = [henryAccount];
    kevin.accounts = [kevinAccount];
    jeanEudes.accounts = [jeanEudesAccount];
    gneeeeeh.accounts = [gneeeeehAccount];

    await manager.save([huguette, hector, henry, kevin, jeanEudes, gneeeeeh]);

    const chnord = manager.create(Group, {
        name: "Famille de la petite huguette",
    });

    await manager.save(chnord);

    huguette.group = chnord;
    huguette.role = Role.LEADER;
    hector.group = chnord;
    hector.role = Role.LEADER;
    henry.group = chnord;
    henry.role = Role.MEMBER;
    kevin.group = chnord;
    kevin.role = Role.MEMBER;
    jeanEudes.group = chnord;
    jeanEudes.role = Role.MEMBER;
    gneeeeeh.group = chnord;
    gneeeeeh.role = Role.MEMBER;

    await manager.save([huguette, hector, henry, kevin, jeanEudes, gneeeeeh]);

    const transactionChnord = manager.create(Transaction, [
        {
            title: "Aides de l'états",
            amount: 4500,
            date: new Date("2024-03-08"),
            account: huguetteAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Salaire",
            amount: 2400,
            date: new Date("2024-03-08"),
            account: hectorAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Salaire",
            amount: 1800,
            date: new Date("2024-03-08"),
            account: henryAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Salaire",
            amount: 1800,
            date: new Date("2024-03-08"),
            account: kevinAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Argent de poche de Jean-Eudes",
            amount: -300,
            date: new Date("2024-03-08"),
            account: huguetteAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Argent de poche de Gneeeeeh",
            amount: -300,
            date: new Date("2024-03-08"),
            account: huguetteAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Argent de poche",
            amount: 300,
            date: new Date("2024-03-08"),
            account: jeanEudesAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Argent de poche",
            amount: 300,
            date: new Date("2024-03-08"),
            account: gneeeeehAccount,
            budget: null,
            isRefill: false,
        },
    ]);

    await manager.save(transactionChnord);

    const budgetsChnord = manager.create(Budget, [
        {
            title: "Sortie",
            description: "Sortie en famille",
            users: [huguette],
        },
        {
            title: "Courses",
            description: "Courses de la semaine",
            users: [huguette],
        },
        {
            title: "Maison",
            description: "Dépenses pour la maison",
            users: [hector],
        },
        {
            title: "TS21",
            description: "Dépenses TS21 pour Jean-Eudes et Gneeeeeh",
            users: [huguette],
        },
        {
            title: "Accesoires de  Scene",
            description: "micro, ampli, tenue, coiffeur",
            users: [henry],
        },
        {
            title: "Tuning",
            description: "Tuning de la voiture de Kevin",
            users: [kevin],
        },
    ]);

    await manager.save(budgetsChnord);

    huguette.budgets = [budgetsChnord[0], budgetsChnord[1], budgetsChnord[3]];
    hector.budgets = [budgetsChnord[2]];
    henry.budgets = [budgetsChnord[4]];
    kevin.budgets = [budgetsChnord[5]];

    await manager.save([huguette, hector, henry, kevin]);

    const transactionsChnord = manager.create(Transaction, [
        {
            title: "reaprovisionnement Sortie",
            amount: -400,
            date: new Date("2024-03-08"),
            account: huguetteAccount,
            budget: budgetsChnord[0],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Maison",
            amount: -1000,
            date: new Date("2024-03-08"),
            account: hectorAccount,
            budget: budgetsChnord[2],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Courses",
            amount: -500,
            date: new Date("2024-03-08"),
            account: huguetteAccount,
            budget: budgetsChnord[1],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement TS21",
            amount: -1000,
            date: new Date("2024-03-08"),
            account: huguetteAccount,
            budget: budgetsChnord[3],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Accesoires de Scene",
            amount: -600,
            date: new Date("2024-03-08"),
            account: henryAccount,
            budget: budgetsChnord[4],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Tuning",
            amount: -800,
            date: new Date("2024-03-08"),
            account: kevinAccount,
            budget: budgetsChnord[5],
            isRefill: true,
        },
    ]);

    await manager.save(transactionsChnord);

    //? famille (detective - comix)

    const [steve, corine] = manager.create(User, [
        {
            lastName: "Amissi",
            firstName: "Steve",
            email: "steva@test.com",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
        {
            lastName: "Aminnon",
            firstName: "Corine",
            email: "coco42@hotmail.com",
            password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
            group: null,
        },
    ]);

    await manager.save([steve, corine]);

    const [steveAccount, corineAccount] = manager.create(Account, [
        {
            title: "Compte courant",
            description: "Compte créer par défaut",
        },
        {
            title: "Compte courant",
            description: "Compte créer par défaut",
        },
    ]);

    await manager.save([steveAccount, corineAccount]);

    steve.accounts = [steveAccount];
    corine.accounts = [corineAccount];

    await manager.save([steve, corine]);

    const group = manager.create(Group, {
        name: "Steve & co.",
    });

    await manager.save(group);

    steve.group = group;
    steve.role = Role.LEADER;
    corine.group = group;
    corine.role = Role.LEADER;

    await manager.save([steve, corine]);

    const transactionsSteve = manager.create(Transaction, [
        {
            title: "Salaire",
            amount: 2700,
            date: new Date("2024-03-08"),
            account: steveAccount,
            budget: null,
            isRefill: false,
        },
        {
            title: "Salaire",
            amount: 2500,
            date: new Date("2024-03-08"),
            account: corineAccount,
            budget: null,
            isRefill: false,
        },
    ]);

    await manager.save(transactionsSteve);

    const budgetsSteve = manager.create(Budget, [
        {
            title: "Achat de BD",
            description: "COMIX",
            users: [steve],
        },
        {
            title: "Lever de coude",
            description: "budget pour boire un verre",
            users: [steve],
        },
    ]);

    await manager.save(budgetsSteve);

    steve.budgets = [budgetsSteve[0], budgetsSteve[1]];

    await manager.save([steve]);

    const transactionsSteve2 = manager.create(Transaction, [
        {
            title: "Reapprovisionnement Achat de BD",
            amount: -1000,
            date: new Date("2024-03-08"),
            account: steveAccount,
            budget: budgetsSteve[0],
            isRefill: true,
        },
        {
            title: "COMIX",
            amount: -200,
            date: new Date("2024-03-09"),
            account: steveAccount,
            budget: budgetsSteve[0],
            isRefill: false,
        },
        {
            title: "COMIX",
            amount: -150,
            date: new Date("2024-03-16"),
            account: steveAccount,
            budget: budgetsSteve[0],
            isRefill: false,
        },
        {
            title: "COMIX",
            amount: -300,
            date: new Date("2024-03-20"),
            account: steveAccount,
            budget: budgetsSteve[0],
            isRefill: false,
        },
        {
            title: "COMIX",
            amount: -150,
            date: new Date("2024-03-28"),
            account: steveAccount,
            budget: budgetsSteve[0],
            isRefill: false,
        },
        {
            title: "Reapprovisionnement Lever de coude",
            amount: -300,
            date: new Date("2024-03-08"),
            account: steveAccount,
            budget: budgetsSteve[1],
            isRefill: true,
        },
        {
            title: "verre avec les copains",
            amount: -50,
            date: new Date("2024-03-09"),
            account: steveAccount,
            budget: budgetsSteve[1],
            isRefill: false,
        },
        {
            title: "verre avec les copains",
            amount: -50,
            date: new Date("2024-03-10"),
            account: steveAccount,
            budget: budgetsSteve[1],
            isRefill: false,
        },
        {
            title: "verre avec les copains",
            amount: -50,
            date: new Date("2024-03-14"),
            account: steveAccount,
            budget: budgetsSteve[1],
            isRefill: false,
        },
        {
            title: "verre avec les copains",
            amount: -50,
            date: new Date("2024-03-16"),
            account: steveAccount,
            budget: budgetsSteve[1],
            isRefill: false,
        },
        {
            title: "detective",
            amount: -400,
            date: new Date("2024-03-27"),
            account: corineAccount,
            budget: null,
            isRefill: false,
        },
    ]);

    await manager.save(transactionsSteve2);

    //? solo (comix - annonce)

    const diana = manager.create(User, {
        lastName: "Prince",
        firstName: "Diana",
        email: "dp@test.com",
        password: "$2a$10$QkHItHEUqRfR/ru3uxWzp.kua.XYlK7AWN8/9LWjB6EHFaVut0Rma",
        group: null,
    });

    await manager.save(diana);

    const dianaAccount = manager.create(Account, {
        title: "Compte courant",
        description: "Compte créer par défaut",
    });

    await manager.save(dianaAccount);

    diana.accounts = [dianaAccount];

    await manager.save(diana);

    const transactionDiana = manager.create(Transaction, {
        title: "Revenu en Liquide de COMIX",
        amount: 3000,
        date: new Date("2024-03-08"),
        account: dianaAccount,
        budget: null,
        isRefill: false,
    });

    await manager.save(transactionDiana);

    const budgetsDiana = manager.create(Budget, [
        {
            title: "Accessoires",
            description: "Accessoires Travail",
            users: [diana],
        },
        {
            title: "Tenues",
            description: "Tenues Travail",
            users: [diana],
        },
        {
            title: "Protection",
            description: "Préservatifs, Pillules, Vaccins",
            users: [diana],
        },
    ]);

    await manager.save(budgetsDiana);

    diana.budgets = [budgetsDiana[0], budgetsDiana[1], budgetsDiana[2]];

    await manager.save(diana);

    const transactionsDiana = manager.create(Transaction, [
        {
            title: "Reapprovisionnement Accessoires",
            amount: -600,
            date: new Date("2024-03-08"),
            account: dianaAccount,
            budget: budgetsDiana[0],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Tenues",
            amount: -400,
            date: new Date("2024-03-08"),
            account: dianaAccount,
            budget: budgetsDiana[1],
            isRefill: true,
        },
        {
            title: "Reapprovisionnement Protection",
            amount: -300,
            date: new Date("2024-03-08"),
            account: dianaAccount,
            budget: budgetsDiana[2],
            isRefill: true,
        },
    ]);

    await manager.save(transactionsDiana);
}
