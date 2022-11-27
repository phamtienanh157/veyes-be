import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async resetPassword(email: string, newPassword: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Đặt lại mật khẩu',
      template: './resetpassword', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        // name: 'Khách hàng',
        newPassword,
      },
    });
  }
}
