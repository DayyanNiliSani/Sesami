import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateAppointmentRequest {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  start: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  end: Date;

  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  organizationId: number;
}

export class UpdateAppointmentRequest {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  start: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  end: Date;
}
