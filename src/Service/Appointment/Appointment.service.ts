import { Injectable, NotFoundException } from '@nestjs/common';
import {
  mapAppointmentToDto,
  ReadAppointmentDto,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from 'src/Infra/Repository/Appointment/appointment.repo.dto';
import AppointmentRepo from 'src/Infra/Repository/Appointment/appointment.repo';
import { InvalidDateRange } from 'src/Domain/Errors/InvalidDateRange.error';
import AppointmentChanges from 'src/Domain/Models/AppointmentChanges';
import OrganizationRepo from 'src/Infra/Repository/Organization/organization.repo';

@Injectable()
export default class AppointmentService {
  public constructor(private repo: AppointmentRepo, private organizationRepo: OrganizationRepo) {}

  public async create(dto: CreateAppointmentDto): Promise<ReadAppointmentDto> {
    const organization = await this.organizationRepo.Get(dto.organizationId);
    if (await this.repo.CheckIfAppointmentExistsForThisRange(dto.start, dto.end, dto.organizationId))
      throw new InvalidDateRange();
    if (!organization) throw new NotFoundException('Organization Not Found');
    return mapAppointmentToDto(
      await this.repo.Create(
        {
          ...dto,
        },
        organization,
      ),
    );
  }

  public async update(id: number, dto: UpdateAppointmentDto): Promise<ReadAppointmentDto> {
    let model = await this.repo.Get(id);
    if (!model) throw new NotFoundException();
    if (await this.repo.CheckIfAppointmentExistsForThisRange(dto.start, dto.end, model.organization.id))
      throw new InvalidDateRange();
    let change = new AppointmentChanges();
    change.end = model.end;
    change.start = model.start;
    model.start = dto.start;
    model.end = dto.end;
    model.changes ? model.changes.push(change) : (model.changes = [change]);
    model = await this.repo.Update(model);
    return mapAppointmentToDto(model);
  }

  public async getAll(organizationId: number): Promise<ReadAppointmentDto[]> {
    return (await this.repo.GetAll(organizationId)).map((a) => mapAppointmentToDto(a));
  }
}
