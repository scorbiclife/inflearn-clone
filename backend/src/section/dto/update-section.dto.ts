import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSectionDto {
  @ApiProperty({
    description: '섹션 제목',
    example: '네스트JS 소개',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: '섹션 설명',
    example: '네스트JS 소개 섹션입니다.',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
