import { getManager } from "typeorm";
import { Post } from "../entities/Post.js";
import { Request, Response } from "express";

export async function postGetAllAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(Post);
    const posts = await postRepository.find({ order: { date: "DESC" } });
    response.send(posts);
}
