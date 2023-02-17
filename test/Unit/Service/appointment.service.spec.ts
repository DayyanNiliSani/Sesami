import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvalidDateRange } from 'src/Domain/Errors/InvalidDateRange.error';
import Appointment from 'src/Domain/Models/Appointment';
import AppointmentChanges from 'src/Domain/Models/AppointmentChanges';
import Organization from 'src/Domain/Models/Organization';
import AppointmentRepo from 'src/Infra/Repository/Appointment/appointment.repo';
import OrganizationRepo from 'src/Infra/Repository/Organization/organization.repo';
import AppointmentService from 'src/Service/Appointment/Appointment.service';

describe('Appointment Service', () => {
  let moduleRef: TestingModule;
  let appointmentRepo: AppointmentRepo;
  let organizationRepo: OrganizationRepo;
  let appointmentService: AppointmentService;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          synchronize: true,
          entities: [Appointment, Organization, AppointmentChanges],
        }),
        TypeOrmModule.forFeature([Appointment, Organization, AppointmentChanges]),
      ],
      providers: [AppointmentRepo, OrganizationRepo],
    }).compile();

    appointmentRepo = moduleRef.get<AppointmentRepo>(AppointmentRepo);
    organizationRepo = moduleRef.get<OrganizationRepo>(OrganizationRepo);
    appointmentService = new AppointmentService(appointmentRepo, organizationRepo);
  });

  it('createAppointment to throw error', async () => {
    jest
      .spyOn(appointmentRepo, 'CheckIfAppointmentExistsForThisRange')
      .mockImplementationOnce(async (start: Date, end: Date) => true);

    const firstOrganization = await organizationRepo.create({ title: 'firstOrganization' });
    expect(
      async () =>
        await appointmentService.create({
          end: new Date(Date.now()),
          start: new Date(Date.now()),
          organizationId: firstOrganization.id,
        }),
    ).rejects.toThrowError(InvalidDateRange);
  });

  it('createAppointment to create object', async () => {
    jest
      .spyOn(appointmentRepo, 'CheckIfAppointmentExistsForThisRange')
      .mockImplementationOnce(async (start: Date, end: Date) => false);

    const firstOrganization = await organizationRepo.create({ title: 'firstOrganization' });
    expect(
      async () =>
        await appointmentService.create({
          start: new Date(Date.now() + 10000),
          end: new Date(Date.now() + 20000),
          organizationId: firstOrganization.id,
        }),
    ).not.toThrow();
  });
});
