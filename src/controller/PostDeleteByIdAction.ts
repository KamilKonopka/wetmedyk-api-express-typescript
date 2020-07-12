import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entities/Post";

export async function postDeleteByIdAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(Post);
    const deletePost = await postRepository.delete(request.params.id);

    response.send(deletePost);
}
