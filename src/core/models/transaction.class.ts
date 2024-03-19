import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Budget } from "./budget.class";
import { Account } from "./account.class";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    public declare id: string;

    @Column({
        type: "date",
    })
    public declare date: Date;

    @Column({
        length: 100,
    })
    public declare title: string;

    @Column({
        type: "double",
    })
    public declare amount: number;

    @Column({
        type: "boolean",
    })
    public declare isRefill: boolean;

    @ManyToOne(() => Account, (account) => account.transactions)
    public declare account: Account;

    @ManyToOne(() => Budget, (budget) => budget.transactions, { nullable: true })
    public declare budget: Budget | null;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public declare createdAt: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    public declare updatedAt: string;
}
