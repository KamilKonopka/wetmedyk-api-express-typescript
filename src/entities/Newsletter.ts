import { INewsletter } from "../models/newsletter.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Newsletter implements INewsletter {
    @PrimaryGeneratedColumn() id: number;
    @Column({ nullable: true }) firstName: string;
    @Column({ nullable: true }) lastName: string;
    @Column({ nullable: true }) street: string;
    @Column({ nullable: true }) city: string;
    @Column({ nullable: true }) zipCode: string;
    @Column({ nullable: true }) email: string;
    @Column({ nullable: true }) phone: string;
}
