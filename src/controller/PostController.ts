import { Request, Response } from "express";
import { getManager, Repository } from "typeorm";
import { Post } from "../entities/Post";

export class PostController {
    async getAll(request: Request, response: Response) {
        const queryParams = request.query || {};
        const repository: Repository<Post> = getManager().getRepository(Post);
        const posts = await repository.find({ order: { date: "DESC" }, where: queryParams });
        response.send(posts);
    }

    async getById(request: Request, response: Response) {
        const repository: Repository<Post> = getManager().getRepository(Post);
        const post = await repository.findOne(request.params.id);

        if (!post) {
            response.status(404);
            response.end();
            return;
        }

        response.send(post);
    }

    async post(request: Request, response: Response) {
        const repository: Repository<Post> = getManager().getRepository(Post);
        const newPost = repository.create(request.body);

        await repository.save(newPost);
        response.send(newPost);
    }

    async putById(request: Request, response: Response) {
        const repository: Repository<Post> = getManager().getRepository(Post);
        const post = await repository.findOne(request.params.id);

        repository.merge(post, request.body);
        const result = await repository.save(post);
        response.send(result);
    }

    async deleteById(request: Request, response: Response) {
        const repository: Repository<Post> = getManager().getRepository(Post);
        const deletePost = await repository.delete(request.params.id);
        response.send(deletePost);
    }
}
