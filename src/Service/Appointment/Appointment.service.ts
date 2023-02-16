import { Injectable } from '@nestjs/common';
import {
  mapAppointmentToDto,
  ReadAppointmentDto,
} from 'src/Infra/Repository/Appointment/Appointment.repo.dto';
import AppointmentRepo from 'src/Infra/Repository/Appointment/Appointment.repo';

@Injectable()
export default class AppointmentService {
  public constructor(private repo: AppointmentRepo) {}

  public async createAppointment(
    dto: UpsertAppointmentRequest,
  ): Promise<ReadAppointmentDto> {
    return mapAppointmentToDto(
      await this.repo.Create({
        ...dto,
      }),
    );
  }

  public async updateAppointment(
    id: number,
    dto: UpsertAppointmentRequest,
  ): Promise<ReadAppointmentDto | undefined> {
    var model = await this.repo.Get(id);
    if (!model) return null;
    model.start = dto.start;
    model.end = dto.end;
    model = await this.repo.Update(model);
    return mapAppointmentToDto(model);
  }

  public async getAllAppointment(): Promise<ReadAppointmentDto[]> {
    return (await this.repo.GetAll()).map((a) => mapAppointmentToDto(a));
  }
}
