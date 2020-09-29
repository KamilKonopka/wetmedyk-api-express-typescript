import { IPost } from "../models/post.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'posts' })
export class Post implements IPost {
    @PrimaryGeneratedColumn() id: number;

    @Column() author: string;
    @Column() date: string;
    @Column() dateGmt: string;
    @Column({ length: 1000 }) content: string;
    @Column() title: string;
    @Column() status: string;
    @Column() name: string;
    @Column() modified: string;
    @Column() modifiedGmt: string;
    @Column() guid: string;
    @Column() type: string;
}
