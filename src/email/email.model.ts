import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendEmail } from './schemas/email.schema';
import { SendEmailDto } from './dto/email.dto';
@Injectable()
export class EmailModel {
  constructor(
    @InjectModel('Email') private readonly emailModel: Model<SendEmail>,
  ) {}

  // Method to save email data to the database
  async saveEmail(emailData: SendEmailDto): Promise<SendEmail> {
    const createdEmail = new this.emailModel(emailData);
    return createdEmail.save();
  }

  // Method to find all emails (or customize for your needs)
  async findAllEmails(): Promise<SendEmail[]> {
    return this.emailModel.find().exec();
  }

  // Add other necessary methods like finding by ID, deleting, etc.
}
