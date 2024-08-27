import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }

  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('profile')
  @UseGuards(LocalAuthGuard)
  getProfile(@Request() req) {
    return req.body;
  }
}
