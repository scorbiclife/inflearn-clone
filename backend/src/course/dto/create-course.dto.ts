import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: '코스 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '코스 URL 슬러그' })
  @IsString()
  slug: string;

  @ApiProperty({ description: '짧은 설명' })
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiProperty({ description: '상세 설명' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '코스 썸네일 사진 URL' })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiProperty({ description: '가격' })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: '할인 가격' })
  @IsNumber()
  @IsOptional()
  discountPrice?: number;

  @ApiProperty({ description: '코스 레벨' })
  @IsString()
  @IsOptional()
  level?: string;

  @ApiProperty({ description: '코스 상태' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: '카테고리 ID 목록' })
  @IsUUID(undefined, { each: true })
  categoryIds: string[];
}
