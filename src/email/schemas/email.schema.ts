import { Schema, Document } from 'mongoose';
import { Address } from 'nodemailer/lib/mailer';

export interface SendEmail extends Document {
  from?: Address;
  recipients: Address[];
  subject: string;
  html: string;
  text?: string;
}

export const EmailSchema = new Schema<SendEmail>(
  {
    from: {
      name: { type: String, required: true },
      address: { type: String, required: true },
    },
    recipients: { type: [String], required: true },
    subject: { type: String, required: true },
    html: { type: String, required: true },
    text: { type: String, required: false },
  },
  { timestamps: true },
);
