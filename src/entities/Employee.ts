import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IEmployee } from "../models/employee.model";

@Entity()
export class Employee implements IEmployee {

    @PrimaryGeneratedColumn() id: number;

    @Column() firstName: string;

    @Column() lastName: string;

    @Column() description: string;

    @Column() photo: string;

    @Column() title: string;
}
