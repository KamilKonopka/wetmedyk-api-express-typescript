import { ILocation } from "../models/location.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location implements ILocation {
    @PrimaryGeneratedColumn() ID: number;

    @Column() name: string;

    @Column() street: string;

    @Column() city: string;

    @Column() zipCode: string;

    @Column() phone: string;

    @Column() openHours: string;

    @Column() mapUrl: string;
}
