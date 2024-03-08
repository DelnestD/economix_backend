import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.class";
import { Budget } from "./budget.class";

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

    //? User has nullable because of zero to one relationship that doesn't exist in typeorm
    @OneToOne(() => Group, (group) => group.users)
    public declare group: Group | null;

    @OneToMany(() => Budget, (budget) => budget.user)
    public declare budgets: Budget[];

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
