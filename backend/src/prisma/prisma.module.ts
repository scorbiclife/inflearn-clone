import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TestPrismaService } from './test-prisma/test-prisma.service';

@Global()
@Module({
  providers: [PrismaService, TestPrismaService],
  exports: [PrismaService, TestPrismaService],
})
export class PrismaModule {}
