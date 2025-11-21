import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    CourseModule,
    SectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
