import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

import { MailTemplatesService } from '../mail_templates/service';
import { SecretsService } from '../utils/secrets/service';

@Injectable()
export class MailService {
    constructor(private readonly mailTemplatesService: MailTemplatesService, private readonly secrets: SecretsService) {}


    async createTransporter() {
        const OAuth2 = google.auth.OAuth2;
        const OAuth2_client = new OAuth2(this.secrets.GOOGLE_CLIENT_ID, this.secrets.GOOGLE_CLIENT_SECRET);
        OAuth2_client.setCredentials({ refresh_token: this.secrets.GOOGLE_REFRESH_TOKEN });
        const accessToken: any = await OAuth2_client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.secrets.EMAIL,
                clientId: this.secrets.GOOGLE_CLIENT_ID,
                clientSecret: this.secrets.GOOGLE_CLIENT_SECRET,
                refreshToken: this.secrets.GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken,
            },
          });

        return transporter;
    }


    async sendMailToActiveAccount(to: string, token: string, name: string) {
        const html = this.mailTemplatesService.getRegisterTemplate(name, token);

        const transporter = await this.createTransporter();

        const mailOptions = {
            from: `Sistema NucciOS <${this.secrets.EMAIL}>`,
            to,
            subject: 'Ativação de conta',
            html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                Logger.error(`sendMail error: ${error}`);
            }
            Logger.log(`sendMail info: ${info.response}`);
        });
    }
}