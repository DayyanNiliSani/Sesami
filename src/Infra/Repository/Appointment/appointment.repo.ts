import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Appointment from 'src/Domain/Models/Appointment';
import Organization from 'src/Domain/Models/Organization';
import { LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { CreateAppointmentDto } from './appointment.repo.dto';

@Injectable()
export default class AppointmentRepo {
  public constructor(@InjectRepository(Appointment) private repo: Repository<Appointment>) {}

  public async Create(dto: CreateAppointmentDto, organization: Organization): Promise<Appointment> {
    const model = new Appointment(dto.start, dto.end, organization);
    await this.repo.save(model);
    return model;
  }

  public async GetAll(organizationId: number): Promise<Appointment[]> {
    const models = await this.repo.find({
      where: {
        organization: {
          id: organizationId,
        },
      },
      relations: {
        changes: true,
      },
    });
    return models;
  }

  public async Get(id: number): Promise<Appointment> {
    const model = await this.repo.findOne({
      where: { id },
      relations: {
        changes: true,
        organization: true,
      },
    });
    return model;
  }

  public async Update(model: Appointment): Promise<Appointment> {
    await this.repo.save(model);
    return model;
  }

  public async CheckIfAppointmentExistsForThisRange(
    selectedStart: Date,
    selectedEnd: Date,
    organizationId: number,
    appointmentId: number = 0,
  ): Promise<boolean> {
    const result = await this.repo.exist({
      where: [
        {
          id: Not(appointmentId),
          start: LessThanOrEqual(selectedEnd),
          end: MoreThanOrEqual(selectedStart),
          organization: {
            id: organizationId,
          },
        },
      ],
    });

    return result;
  }
}
