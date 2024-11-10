import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email/email.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://anhhtfe:WoZjFGzJa4N2UpJH@cluster0.4ssfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),

    ConfigModule.forRoot(),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
