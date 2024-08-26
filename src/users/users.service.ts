import { Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable({
  scope: Scope.REQUEST,
})
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<Users> {
    const user = this.prisma.users.create({
      data: createUserDto,
    });
    return user;
  }

  findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  findOne(id: string): Promise<Users> {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
