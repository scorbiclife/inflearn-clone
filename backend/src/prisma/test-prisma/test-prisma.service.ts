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
    await this.overwriteWithNewResources();
  }

  async onModuleDestroy() {
    await this.cleanupResources();
  }

  /** Implement this as a method because I'm unsure if there's a clean scope-based solution */
  async reset() {
    await this.cleanupResources();
    await this.overwriteWithNewResources();
  }

  private async overwriteWithNewResources() {
    this.testContainer = await new PostgreSqlContainer('postgres:14').start();
    const connectionString = this.testContainer.getConnectionUri();

    // Push schema and seed using CLI commands
    execSync('npx prisma db push --skip-generate', {
      env: { ...process.env, DATABASE_URL: connectionString },
      stdio: 'inherit',
    });
    execSync('npx prisma db seed', {
      env: { ...process.env, DATABASE_URL: connectionString },
      stdio: 'inherit',
    });

    const adapter = new PrismaPg({ connectionString });
    this.prisma = new PrismaClient({ adapter });
  }

  private async cleanupResources() {
    // Cleanup in reverse order
    await this.prisma?.$disconnect();
    await this.testContainer?.stop();
  }
}
