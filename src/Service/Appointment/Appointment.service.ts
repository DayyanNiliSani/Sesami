import { Injectable, NotFoundException } from '@nestjs/common';
import {
  mapAppointmentToDto,
  ReadAppointmentDto,
  UpsertAppointmentDto,
} from 'src/Infra/Repository/Appointment/Appointment.repo.dto';
import AppointmentRepo from 'src/Infra/Repository/Appointment/Appointment.repo';
import { InvalidDateRange } from 'src/Domain/Errors/InvalidDateRange.error';
import AppointmentChanges from 'src/Domain/Models/AppointmentChanges';

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
    let model = await this.repo.Get(id);
    if (!model) throw new NotFoundException();
    if (await this.repo.CheckIfAppointmentExistsForThisRange(dto.start, dto.end)) throw new InvalidDateRange();
    let change = new AppointmentChanges();
    change.end = model.end;
    change.start = model.start;
    model.start = dto.start;
    model.end = dto.end;
    model.changes ? model.changes.push(change) : (model.changes = [change]);
    model = await this.repo.Update(model);
    return mapAppointmentToDto(model);
  }

  public async getAllAppointment(): Promise<ReadAppointmentDto[]> {
    return (await this.repo.GetAll()).map((a) => mapAppointmentToDto(a));
  }
}
