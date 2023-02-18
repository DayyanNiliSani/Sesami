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
import { RedLockInstance } from 'src/Infra/Lock/redLock';

@Injectable()
export default class AppointmentService {
  public constructor(
    private repo: AppointmentRepo,
    private organizationRepo: OrganizationRepo,
    private redLockInstance: RedLockInstance,
  ) {}

  public async create(dto: CreateAppointmentDto): Promise<ReadAppointmentDto> {
    const organization = await this.organizationRepo.Get(dto.organizationId);
    const lock = await this.redLockInstance.instance.acquire(['appointmentLock', organization.id.toString()], 1000);
    if (await this.repo.CheckIfAppointmentExistsForThisRange(dto.start, dto.end, dto.organizationId))
      throw new InvalidDateRange();
    if (!organization) throw new NotFoundException('Organization Not Found');
    const result = mapAppointmentToDto(
      await this.repo.Create(
        {
          ...dto,
        },
        organization,
      ),
    );
    lock.unlock((err, value) => {});
    return result;
  }

  public async update(id: number, dto: UpdateAppointmentDto): Promise<ReadAppointmentDto> {
    let model = await this.repo.Get(id);
    if (!model) throw new NotFoundException();
    const lock = await this.redLockInstance.instance.acquire(
      ['appointmentLock', model.organization.id.toString()],
      1000,
    );
    if (await this.repo.CheckIfAppointmentExistsForThisRange(dto.start, dto.end, model.organization.id, model.id))
      throw new InvalidDateRange();
    let change = new AppointmentChanges();
    change.end = model.end;
    change.start = model.start;
    model.start = dto.start;
    model.end = dto.end;
    model.changes ? model.changes.push(change) : (model.changes = [change]);
    model = await this.repo.Update(model);
    lock.unlock((err, value) => {});
    return mapAppointmentToDto(model);
  }

  public async getAll(organizationId: number): Promise<ReadAppointmentDto[]> {
    return (await this.repo.GetAll(organizationId)).map((a) => mapAppointmentToDto(a));
  }
}
