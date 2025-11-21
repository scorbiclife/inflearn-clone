import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLectureDto {
  @ApiProperty({ description: '강의 제목', example: '들어가며' })
  @IsString()
  title: string;

  @ApiProperty({
    description: '강의 길이 (ms)',
    example: 360000,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({
    description: '개별 강의 미리보기 여부',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPreview?: boolean;

  @ApiProperty({
    description: '개별 비디오 업로드 정보',
    required: false,
  })
  @IsOptional()
  videoStorageInfo?: Record<string, any>;
}
