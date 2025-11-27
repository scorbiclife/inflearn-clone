import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: '코스 제목' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: '짧은 설명' })
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiPropertyOptional({ description: '상세 설명' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: '코스 썸네일 사진 URL' })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiPropertyOptional({ description: '가격' })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ description: '할인 가격' })
  @IsNumber()
  @IsOptional()
  discountPrice?: number;

  @ApiPropertyOptional({ description: '코스 레벨' })
  @IsString()
  @IsOptional()
  level?: string;

  @ApiPropertyOptional({ description: '코스 상태' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: '카테고리 ID 목록' })
  @IsUUID(undefined, { each: true })
  categoryIds: string[];
}
