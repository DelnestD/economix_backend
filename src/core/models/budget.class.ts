import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.class";
import { User } from "./user.class";

@Entity()
export class Budget {
    @PrimaryGeneratedColumn("uuid")
    public declare id: string;

    @Column({
        length: 100,
    })
    public declare title: string;

    @Column({
        type: "text",
        nullable: true,
    })
    public declare description: string;

    @Column({
        type: "double",
    })
    public declare amount: number;

    @OneToOne(() => User, (user) => user.budgets)
    public declare user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.budget)
    public declare transactions: Transaction[] | null;

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
