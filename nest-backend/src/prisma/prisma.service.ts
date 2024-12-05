import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma connected successfully');
    } catch (error) {
      console.error('Prisma connection error:', error);
      throw new Error('Unable to connect to Prisma');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
