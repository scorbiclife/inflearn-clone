import { execSync } from 'child_process';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';

@Injectable()
export class TestPrismaService implements OnModuleInit, OnModuleDestroy {
  private testContainer: StartedPostgreSqlContainer;
  public prisma: PrismaClient;

  async onModuleInit() {
    await this.initResources();
    await this.reset();
  }

  async onModuleDestroy() {
    await this.cleanupResources();
  }

  /** Implement this as a method because I'm unsure if there's a clean scope-based solution */
  async reset() {
    const connectionString = this.testContainer.getConnectionUri();
    execSync('pnpm exec prisma db push --force-reset', {
      env: { ...process.env, DATABASE_URL: connectionString },
    });
    execSync('pnpm exec prisma db seed', {
      env: { ...process.env, DATABASE_URL: connectionString },
    });
  }

  private async initResources() {
    this.testContainer = await new PostgreSqlContainer('postgres:14').start();
    const connectionString = this.testContainer.getConnectionUri();
    const adapter = new PrismaPg({ connectionString });
    this.prisma = new PrismaClient({ adapter });
  }

  private async cleanupResources() {
    // Cleanup in reverse order
    await this.prisma?.$disconnect();
    await this.testContainer?.stop();
  }
}
