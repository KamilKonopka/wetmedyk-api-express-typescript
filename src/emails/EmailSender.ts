import nodemailer from 'nodemailer';
import MailGen from 'mailgen';
import env from 'env-var';

export class EmailSender {
    sender: string = env.get('MAIL_ADDRESS').required().asString();

    private transporter = nodemailer.createTransport(this.getConfig());

    private mailGenerator = new MailGen({
        theme: 'default',
        product: {
            name: 'WetMedyk',
            link: 'http://www.wetmedyk.pl',
        }
    })

    async sendEmail(email: string, subject: string) {
        const emailBody = await this.mailGenerator.generate({ body: { name: email } });
        const message = {
            subject,
            html: emailBody,
            from: this.sender,
            to: email,
        };
        await this.transporter
            .sendMail(message)
            .then(() => console.log(`message to ${email} has been sent successfully`))
            .catch((error) => console.log(error));
    }

    getConfig() {
        return {
            host: env.get('MAIL_SMTP_SERVER').required().asString(),
            service: 'WetMedyk',
            secure: true,
            port: Number.parseFloat(env.get('MAIL_SMTP_PORT').required().asString()),
            auth: {
                user: this.sender,
                pass: env.get('MAIL_PASSWORD').required().asString(),
            }
        }
    }
}
