import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entities/Post";

export async function postGetByIdAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(Post);
    const post = await postRepository.findOne(request.params.id);

    if (!post) {
        response.status(404);
        response.end();
        return;
    }

    response.send(post);
}
