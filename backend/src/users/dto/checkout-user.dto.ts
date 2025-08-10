import { IsString, IsEmail } from 'class-validator';

export class CheckoutDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  eventId: string;
}
