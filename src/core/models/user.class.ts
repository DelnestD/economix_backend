import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.class";
import { Budget } from "./budget.class";
import { Account } from "./account.class";

export enum Role {
    LEADER = "leader",
    MEMBER = "member",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    public declare id: string;

    @Column({
        unique: true,
    })
    public declare email: string;

    @Column({
        length: 32,
    })
    public declare firstName: string;

    @Column({
        length: 32,
    })
    public declare lastName: string;

    @Column({
        length: 60,
    })
    public declare password: string;

    @Column({
        type: "enum",
        enum: Object.values(Role),
        nullable: true,
        default: null,
    })
    public declare role: Role | null;

    @ManyToOne(() => Group, (group) => group.users, { nullable: true })
    public declare group: Group | null;

    @ManyToMany(() => Account)
    @JoinTable()
    public declare account: Account[];

    @ManyToMany(() => Budget, { nullable: true })
    @JoinTable()
    public declare budgets: Budget[] | null;

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
