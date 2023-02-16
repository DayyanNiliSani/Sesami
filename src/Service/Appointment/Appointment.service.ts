import { Injectable, NotFoundException } from '@nestjs/common';
import {
  mapAppointmentToDto,
  ReadAppointmentDto,
  UpsertAppointmentDto,
} from 'src/Infra/Repository/Appointment/Appointment.repo.dto';
import AppointmentRepo from 'src/Infra/Repository/Appointment/Appointment.repo';
import { InvalidDateRange } from 'src/Domain/Errors/InvalidDateRange.error';

@Injectable()
export default class AppointmentService {
  public constructor(private repo: AppointmentRepo) {}

  public async createAppointment(dto: UpsertAppointmentDto): Promise<ReadAppointmentDto> {
    if (await this.repo.CheckIfAppointmentExistsForThisRange(dto.start, dto.end)) throw new InvalidDateRange();
    return mapAppointmentToDto(
      await this.repo.Create({
        ...dto,
      }),
    );
  }

  public async updateAppointment(id: number, dto: UpsertAppointmentDto): Promise<ReadAppointmentDto> {
    var model = await this.repo.Get(id);
    if (!model) throw new NotFoundException();
    if (this.repo.CheckIfAppointmentExistsForThisRange(dto.start, dto.end)) throw new InvalidDateRange();
    model.start = dto.start;
    model.end = dto.end;
    model = await this.repo.Update(model);
    return mapAppointmentToDto(model);
  }

  public async getAllAppointment(): Promise<ReadAppointmentDto[]> {
    return (await this.repo.GetAll()).map((a) => mapAppointmentToDto(a));
  }
}
