import { Request, Response } from "express";
import fs from "fs";
import { imagePath } from "../index";

const forbiddenFileNames = ['.gitkeep'];

export async function imagesGetAllNames (request: Request, response: Response) {
    fs.readdir(imagePath, (err, files: string[]) => {
        const fileNames = files.filter(file => !forbiddenFileNames.includes(file));
        response.send(fileNames);
    })
}
