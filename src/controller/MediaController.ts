import { Controller } from "./Controller";
import { Request, Response } from "express";
import multer from "multer";
import { imagePath } from "../index";
import fs from "fs";
import sharp from 'sharp';

const storage = multer.diskStorage({
    destination: (request: Request, file, callback) => {
        callback(null, imagePath);
    },
    filename(req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, file.originalname);
    },
});

const options = {
    storage,
    dest: imagePath,
    limits: {
        fieldSize: 1000000,
    },
    fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please provide a valid image file format'));
        }
        callback(undefined, true);
    },
}

const upload = multer(options).single('file');

export class MediaController implements Controller {
    forbiddenFileNames: string[] = ['.gitkeep'];

    async getAll(request: Request, response: Response) {
        fs.readdir(imagePath, (err, files: string[]) => {
            const fileNames = files.filter(file => !this.forbiddenFileNames.includes(file));
            response.send(fileNames);
        })
    }

    async post(request: Request, response: Response): Promise<any> {
        // buffer usage example
        // const buffer = await sharp(request.file.buffer)
        //     .resize({ width: 250, height: 250 })
        //     .png()
        //     .toBuffer();

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
