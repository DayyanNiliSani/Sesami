import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export default class UpsertAppointmentRequest {
  @Type(() => Date)
  @IsDate()
  start: Date;

  @Type(() => Date)
  @IsDate()
  end: Date;
}
