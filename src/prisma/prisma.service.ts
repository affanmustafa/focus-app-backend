import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$extends(
      withPulse({
        apiKey: process.env['PULSE_API_KEY'] as string,
      }),
    );
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
