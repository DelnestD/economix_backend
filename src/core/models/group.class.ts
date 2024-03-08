import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.class";

@Entity()
export class Group {
    @PrimaryGeneratedColumn("uuid")
    public declare id: string;

    @Column()
    public declare name: string;

    @OneToOne(() => User, (user) => user.group)
    public declare users: User[];

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
