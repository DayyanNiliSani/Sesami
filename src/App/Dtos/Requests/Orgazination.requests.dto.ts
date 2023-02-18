import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export default class UpsertOrganizationRequest {
  @ApiProperty()
  @Type(() => String)
  @IsNotEmpty()
  title: string;
}
