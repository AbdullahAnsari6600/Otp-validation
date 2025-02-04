import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from './otp.schema';
import * as otpGenerator from 'otp-generator';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<Otp>) {}

  async generateOtp(email: string): Promise<string> {
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    await this.otpModel.create({ email, otp });
    await this.sendOtpEmail(email, otp);
    return '✅ OTP sent successfully';
    }
    async verifyOtp(email: string, otp: string): Promise<string> {
    const otpRecord = await this.otpModel.findOne({ email, otp });
    if (otpRecord) {
      return '✅ OTP verified successfully';
    } else {
      return '❌ Invalid OTP';
    }
}
private async sendOtpEmail(email: string, otp: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is: ${otp}`,
    });
  }
}
