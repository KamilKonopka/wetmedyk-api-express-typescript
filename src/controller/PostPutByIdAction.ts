import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entities/Post";

export async function postPutByIdAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(Post);
    const post = await postRepository.findOne(request.params.id);

    postRepository.merge(post, request.body);

    const result = await postRepository.save(post);

    response.send(result);
}
