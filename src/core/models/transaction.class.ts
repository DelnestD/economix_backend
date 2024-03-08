import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Budget } from "./budget.class";

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

    @ManyToOne(() => Budget, (budget) => budget.transactions)
    public declare budget: Budget;

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
