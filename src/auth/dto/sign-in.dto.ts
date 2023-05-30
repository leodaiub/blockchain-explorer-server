import { ApiProperty, PickType } from '@nestjs/swagger';
import { Auth } from '../entities/auth.entity';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDto extends PickType(Auth, ['email', 'password']) {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
