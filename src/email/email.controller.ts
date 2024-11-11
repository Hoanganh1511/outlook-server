import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get('/')
  async getEmails(
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: string,
    @Query('filter') filter: string,
  ) {
    return this.emailService.getEmails(sortBy, sortOrder, filter);
  }
  @Post('/send-email')
  async sendMai(@Body() body: SendEmailDto) {
    const dto: SendEmailDto = body;
    // {
    //   from: { name: 'Jimin Sample', address: 'jiminsample1@gmail.com' },
    //   recipients: [{ name: 'Anh Hoang', address: 'anhht.fe@gmail.com' }],
    //   subject: 'Test Send Email',
    //   html: "<p>This is a email for test. %name% don't need to reply. Thanks!</p>",
    //   // placeholderReplacements: body,
    // };
    return await this.emailService.sendEmail(dto);
  }
  @Post('/delete-emails')
  async deleteInboxes(@Body() body: string[]) {
    // {
    //   from: { name: 'Jimin Sample', address: 'jiminsample1@gmail.com' },
    //   recipients: [{ name: 'Anh Hoang', address: 'anhht.fe@gmail.com' }],
    //   subject: 'Test Send Email',
    //   html: "<p>This is a email for test. %name% don't need to reply. Thanks!</p>",
    //   // placeholderReplacements: body,
    // };
    return await this.emailService.deleteInboxes(body);
  }
}
