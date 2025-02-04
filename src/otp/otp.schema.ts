import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, expires: '5m' })
export class Otp extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  otp: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
