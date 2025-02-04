import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('generate')
  async generateOtp(@Body('email') email: string): Promise<string> {
    return this.otpService.generateOtp(email);
  }

  @Post('verify')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string): Promise<string> {
    return this.otpService.verifyOtp(email, otp);
  }
}
