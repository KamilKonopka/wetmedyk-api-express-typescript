import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IService} from "../models/service.model";

@Entity()
export class Service implements IService {
    @PrimaryGeneratedColumn() id: number;
    @Column() title: string;
    @Column() image: string;
    @Column() description: string;
    @Column('text', { array: true }) details: string[];
    @Column('int', { array: true }) available: number[];
}
