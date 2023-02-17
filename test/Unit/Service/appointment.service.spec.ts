import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvalidDateRange } from 'src/Domain/Errors/InvalidDateRange.error';
import Appointment from 'src/Domain/Models/Appointment';
import AppointmentRepo from 'src/Infra/Repository/Appointment/Appointment.repo';
import AppointmentService from 'src/Service/Appointment/Appointment.service';

describe('Appointment Service', () => {
  let moduleRef: TestingModule;
  let appointmentRepo: AppointmentRepo;
  let appointmentService: AppointmentService;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          synchronize: true,
          entities: [Appointment],
        }),
        TypeOrmModule.forFeature([Appointment]),
      ],
      providers: [AppointmentRepo],
    }).compile();

    appointmentRepo = moduleRef.get<AppointmentRepo>(AppointmentRepo);
    appointmentService = new AppointmentService(appointmentRepo);
  });

  it('createAppointment to throw error', async () => {
    jest
      .spyOn(appointmentRepo, 'CheckIfAppointmentExistsForThisRange')
      .mockImplementationOnce(async (start: Date, end: Date) => true);

    expect(
      async () =>
        await appointmentService.createAppointment({ end: new Date(Date.now()), start: new Date(Date.now()) }),
    ).rejects.toThrowError(InvalidDateRange);
  });

  it('createAppointment to create object', async () => {
    jest
      .spyOn(appointmentRepo, 'CheckIfAppointmentExistsForThisRange')
      .mockImplementationOnce(async (start: Date, end: Date) => false);

    expect(
      async () =>
        await appointmentService.createAppointment({
          start: new Date(Date.now() + 10000),
          end: new Date(Date.now() + 20000),
        }),
    ).not.toThrow();
  });
});
