import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: CreateUserDto): Promise<Users> {
    const saltedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.users.create({
      data: {
        ...data,
        avatarUrl: data.avatarUrl || '',
        password: saltedPassword,
      },
    });
    return user;
  }

  async validateUser(username: string, password: string): Promise<Users> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: Users) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
