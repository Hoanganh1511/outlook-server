import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/email.dto';
import { EmailModel } from './email.model';
import { SendEmail } from './schemas/email.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('EmailModel') private emailModel: Model<SendEmail>,
    private readonly configService: ConfigService,
    // private readonly emailModel: Model<SendEmail>,
  ) {}

  emailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false, // Set to true if using SSL/TLS
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
    //     Example of sending a test email
    return transporter;
  }
  template(html: string, replacements: Record<string, string>) {
    return html.replace(
      /%(\w*)%/g, // or /{(\w*)}/g for "{this} instead of %this%"
      function (m, key) {
        return replacements.hasOwnProperty(key) ? replacements[key] : '';
      },
    );
  }
  async sendEmail(dto: SendEmailDto) {
    const { recipients, subject } = dto;
    console.log(dto);
    const html = dto.placeholderReplacements
      ? this.template(dto.html, dto.placeholderReplacements)
      : dto.html;
    const transport = this.emailTransport();
    const options: nodemailer.SendMailOptions = {
      //       from: from ?? {
      //         name: this.configService.get<string>('APP_NAME'),
      //         address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      //       },
      from: this.configService.get<string>('EMAIL_USER'),
      to: recipients,
      subject,
      html,
    };
    try {
      const result = await transport.sendMail(options);
      const reformatResult = {
        from: {
          name: dto.from.name,
          address: result.envelope.from,
        },
        recipients: result.envelope.to,
        subject,
        html,
      };
      const newEmail = new this.emailModel(reformatResult);
      return newEmail.save();
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  // : Promise<SendEmail[]>
  async getEmails(
    sortBy: string = 'date',
    sortOrder: string = 'newest',
    filter: string = 'all',
  ) {
    const order = sortOrder === 'newest' ? -1 : 1;
    console.log(order);
    return this.emailModel.find().sort({ createdAt: order }).exec();
  }
  async deleteInboxes(ids: string[]) {
    return this.emailModel.deleteMany({
      _id: {
        $in: ids,
      },
    });
  }
}
// async findAllEmails(): Promise<SendEmail[]> {
//   return this.emailModel.find().exec();
// }
// {
//     "accepted": [
//         "anhht.fe@gmail.com"
//     ],
//     "rejected": [],
//     "ehlo": [
//         "SIZE 35882577",
//         "8BITMIME",
//         "AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH",
//         "ENHANCEDSTATUSCODES",
//         "PIPELINING",
//         "CHUNKING",
//         "SMTPUTF8"
//     ],
//     "envelopeTime": 997,
//     "messageTime": 829,
//     "messageSize": 354,
//     "response": "250 2.0.0 OK  1731258427 98e67ed59e1d1-2e9a5f52c70sm7052316a91.10 - gsmtp",
//     "envelope": {
//         "from": "jiminsample1@gmail.com",
//         "to": [
//             "anhht.fe@gmail.com"
//         ]
//     },
//     "messageId": "<d20ab066-8f42-a198-30e7-3fa9a2ae989e@gmail.com>"
// }
