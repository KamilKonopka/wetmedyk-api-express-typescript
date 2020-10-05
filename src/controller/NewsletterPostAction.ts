import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Newsletter } from "../entities/Newsletter";
import { EmailSender } from "../emails/EmailSender";

export const newsletterPostAction = async (req: Request, res: Response) => {
    const newsletterRepository = getManager().getRepository(Newsletter);
    const newsletter = await newsletterRepository.findOne({ where: { email: req.body.email } });

    if (!newsletter) {
        const newNewsletter = newsletterRepository.create(req.body);
        await newsletterRepository.save(newNewsletter);

        const emailController = new EmailSender();
        await emailController.sendEmail(req.body.email, 'Successful Newsletter Subscription');

        return res.status(200).send({ message: `Email address: ${req.body.email} has been successfully added to database.` });
    } else {
        return res.status(400).send({ message: `Email address: ${req.body.email} already exists.` });
    }
}
