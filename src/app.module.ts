import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/strategy/local.strategy';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    UsersService,
    LocalStrategy,
  ],
})
export class AppModule {}
