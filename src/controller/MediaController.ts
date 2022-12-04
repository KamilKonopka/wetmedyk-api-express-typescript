import { Controller } from "./Controller";
import { Request, Response } from "express";
import aws, {AWSError} from 'aws-sdk';
import {DeleteObjectOutput, ListObjectsV2Output, Object} from "aws-sdk/clients/s3";
import ReadableStream = NodeJS.ReadableStream;

const bucketName = 'wetmedyk';

export class MediaController implements Controller {

    async getAll(request: Request, response: Response) {
        aws.config.update({ region: 'eu-central-1' });

        const s3 = new aws.S3();

        await s3.listObjectsV2({ Bucket: bucketName }, (err: AWSError, data: ListObjectsV2Output) => {
            if (data) {
                return response
                    .status(200)
                    // tslint:disable-next-line:ban-types
                    .send(data.Contents.map((content: Object) => content.Key));

            }

            return new Error('Failed to load images');
        });
    }

    async post(request: Request, response: Response): Promise<any> {
        request.busboy.on('file', (fieldName: string, file: ReadableStream, { filename, encoding, mimetype }: { filename: string, encoding: string, mimetype: string }) => {
            aws.config.update({ region: 'eu-central-1' });

            const s3 = new aws.S3();

            const s3Params = {
                Bucket: bucketName,
                Key: filename,
                ContentType: mimetype,
                ACL: 'public-read',
                Body: file,
            };

            s3.upload(s3Params, (err: Error, data: any) => {
                if (data) {
                    return response.status(200).send({ filename: data.Key });
                }
                return new Error('Failed to upload image');
            })
        });

        request.pipe(request.busboy);
    }

    async deleteById(request: Request, response: Response): Promise<any> {
        aws.config.update({ region: 'eu-central-1' });

        const s3 = new aws.S3();

        const s3Params = {
            Key: request.params.id,
            Bucket: bucketName,
        }

        await s3.deleteObject(s3Params, (err: AWSError, data: DeleteObjectOutput) => {
            if (data) {
                return response.status(200).send(s3Params.Key);
            }
            return new Error('No File found');
        });
    }
}
