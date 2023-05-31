import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return bcrypt.hashSync(value, 10);
  })
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
