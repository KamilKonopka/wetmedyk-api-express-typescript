import { Request, Response } from "express";
import multer from "multer";
import { imagePath } from "../index";

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, imagePath);
    },
    filename(req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage }).single('file');

export async function filePostAction(request: Request, response: Response) {
    return upload(request, response, (err: any) => {
        if (err instanceof multer.MulterError) {
            return response.status(500).json(err);
        } else if (err) {
            return response.status(500).json(err);
        }
        return response.status(200).send(request.file)
    })
}
