import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from './functions';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: JwtService, useValue: {} }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('create', () => {
    test('should create a user and return a response', async () => {
      const createUserDto: SignUpDto = {
        name: 'usertest',
        password: 'testpassword',
        email: 'test@email.com',
      };
      // Provide your own test data
      const commandResponse = {}; // Provide the expected response from the commandBus

      const result = await service.signUp(createUserDto);

      expect(result).toEqual({
        message: 'OK_SUCCESSFUL_OPERATION',
        data: commandResponse,
      });
    });

    test('should throw DatabaseError if an error occurs', async () => {
      const createUserDto: SignUpDto = {
        name: 'usertest',
        password: 'testpassword',
        email: 'test@email.com',
      };
      // Provide your own test data
      const errorMessage = 'Database error';

      await expect(service.signUp(createUserDto)).rejects.toThrowError(
        'DatabaseError: ' + errorMessage,
      );
    });
  });

  describe('signIn', () => {
    test('should sign in a user and return a response', async () => {
      const signInUserDto: SignInDto = {
        email: 'test@email.com',
        password: 'testpassword',
      }; // Provide your own test data
      const queryResponse = {}; // Provide the expected response from the queryBus
      const password = 'password'; // Provide the password for comparison

      jest.fn(comparePassword).mockImplementation();

      const result = await service.signIn(signInUserDto);

      expect(comparePassword).toHaveBeenCalledWith(
        signInUserDto.password,
        password,
      );
      expect(result).toEqual({
        message: 'OK_SUCCESSFUL_OPERATION',
        data: {
          token: expect.any(String),
          user: queryResponse,
        },
      });
    });
  });
});
