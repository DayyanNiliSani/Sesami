import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Appointment from 'src/Domain/Models/Appointment';
import {
  Repository,
} from 'typeorm';
import {
  mapDtoToAppointment,
  UpsertAppointmentDto,
} from './Appointment.repo.dto';

@Injectable()
export default class AppointmentRepo {
  public constructor(
    @InjectRepository(Appointment) private repo: Repository<Appointment>,
  ) {}

  public async Create(dto: UpsertAppointmentDto): Promise<Appointment> {
    const model = mapDtoToAppointment(dto);
    await this.repo.save(model);
    return model;
  }

  public async GetAll(): Promise<Appointment[]> {
    const models = await this.repo.find();
    return models;
  }

  public async Get(id: number): Promise<Appointment> {
    const model = await this.repo.findOne({ where: { id } });
    return model;
  }

  public async Update(model: Appointment): Promise<Appointment> {
    await this.repo.save(model);
    return model;
  }

}
