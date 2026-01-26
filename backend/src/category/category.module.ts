import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { PrismaCategoryRepository } from './prisma-category.repository';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    { provide: CategoryRepository, useClass: PrismaCategoryRepository },
  ],
})
export class CategoryModule {}
