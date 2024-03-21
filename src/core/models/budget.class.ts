import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
        type: "boolean",
        default: true,
    })
    public declare isActive: boolean;

    @OneToOne(() => Transaction, (transaction) => transaction.budget, { nullable: true })
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
