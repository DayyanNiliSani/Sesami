import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export default class UpsertOrganizationRequest {
  @Type(() => String)
  @IsNotEmpty()
  title: string;
}
