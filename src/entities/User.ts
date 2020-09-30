import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../models/user.model";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn() id: number;

    @Column() userName: string;

    @Column() password: string;

    @Column() dateCreated: string;

}
