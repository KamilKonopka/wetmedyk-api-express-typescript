import { Controller } from "./Controller";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Newsletter } from "../entities/Newsletter";
import { EmailSender } from "../emails/EmailSender";

export class NewsletterController implements Controller {
    async post(req: Request, res: Response): Promise<any> {
        const repository = getManager().getRepository(Newsletter);
        const newsletter = await repository.findOne({where: {email: req.body.email}});

        if (!newsletter) {
            const newNewsletter = repository.create(req.body);
            await repository.save(newNewsletter);

            const emailController = new EmailSender();
            await emailController.sendEmail(req.body.email, 'Successful Newsletter Subscription');

            return res.status(200).send({message: `Email address: ${req.body.email} has been successfully added to database.`, status: 200});
        } else {
            return res.status(200).send({message: `Email address: ${req.body.email} already exists.`, status: 400});
        }
    }

    async deleteById(req: Request, res: Response) {
        const repository = getManager().getRepository(Newsletter);
        const deleteEmail = await repository
            .findOne({where: {email: req.body.email}});

        await repository.delete(deleteEmail);

        res.status(200).send({
            message: `Email address ${req.body.email} was successfully removed from our database`,
            status: 200
        });
    }
}
