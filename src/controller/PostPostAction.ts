import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entities/Post";

export async function postPostAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(Post);
    const newPost = postRepository.create(request.body);

    await postRepository.save(newPost);

    response.send(newPost);
}
