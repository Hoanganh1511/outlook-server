import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailModel } from './email.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSchema } from './schemas/email.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: EmailModel.name, schema: EmailSchema }]),
    ConfigModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
