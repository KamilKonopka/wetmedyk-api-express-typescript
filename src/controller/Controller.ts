import { Request, Response } from "express";

export abstract class Controller {
    getAll?: (req: Request, res: Response) => Promise<void>;
    getById?: (req: Request, res: Response) => Promise<void>;
    post: (req: Request, res: Response) => Promise<void>;
    putById?: (req: Request, res: Response) => Promise<void>;
    deleteById?: (req: Request, res: Response) => Promise<void>;
}
