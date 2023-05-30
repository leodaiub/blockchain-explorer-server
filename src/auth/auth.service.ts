import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { comparePassword } from './functions';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const userExists = await this.authRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (userExists) {
      throw new ConflictException('Authwith this email already exists');
    }

    const savedAuth = await this.authRepository.save(signUpDto);
    const token = this.jwtService.sign(savedAuth);

    delete savedAuth.password;

    return { ...savedAuth, token };
  }

  async signIn({ password, email }: SignInDto) {
    const userFound = await this.authRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      throw new NotFoundException('USER NOT FOUND');
    }

    await comparePassword(password, userFound.password);

    return { token: await this.jwtService.signAsync(userFound.id), userFound };
  }
}
