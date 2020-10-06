import { Controller } from "./Controller";
import { Request, Response } from "express";
import multer from "multer";
import { imagePath } from "../index";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, imagePath);
    },
    filename(req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, file.originalname);
    }
});

const upload = multer({storage}).single('file');

export class MediaController implements Controller {
    forbiddenFileNames: string[] = ['.gitkeep'];

    async getAll(request: Request, response: Response) {
        fs.readdir(imagePath, (err, files: string[]) => {
            const fileNames = files.filter(file => !this.forbiddenFileNames.includes(file));
            response.send(fileNames);
        })
    }

    async post(request: Request, response: Response): Promise<any> {
        return upload(request, response, (err: any) => {
            if (err instanceof multer.MulterError) {
                return response.status(500).json(err);
            } else if (err) {
                return response.status(500).json(err);
            }
            return response.status(200).send(request.file)
        })
    }
}
