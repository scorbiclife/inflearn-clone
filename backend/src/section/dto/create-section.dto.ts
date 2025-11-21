import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({
    description: '섹션 제목',
    example: '네스트JS 소개',
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '섹션 설명',
    example: '이 섹션에서는 NestJS를 실전 예제와 함께 소개합니다.',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
