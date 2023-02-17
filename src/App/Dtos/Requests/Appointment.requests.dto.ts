import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateAppointmentRequest {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  start: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  end: Date;

  @Type(() => Number)
  @IsNotEmpty()
  organizationId: number;
}

export class UpdateAppointmentRequest {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  start: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  end: Date;
}
