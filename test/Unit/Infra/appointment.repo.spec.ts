import { DataSource } from 'typeorm';
import { Entities } from 'src/Domain/Models';
import Appointment from 'src/Domain/Models/Appointment';
import AppointmentRepo from 'src/Infra/Repository/Appointment/appointment.repo';
import Organization from 'src/Domain/Models/Organization';
import AppointmentChanges from 'src/Domain/Models/AppointmentChanges';

describe('Appointment Repository Tests', () => {
  let dbConnect: DataSource;
  let appointmentRepo: AppointmentRepo;
  beforeEach(async () => {
    dbConnect = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      entities: [Appointment, Organization, AppointmentChanges],
    });

    await dbConnect.initialize();
    appointmentRepo = new AppointmentRepo(dbConnect.getRepository(Appointment));
  });

  it('CheckIfAppointmentExistsForThisRange', async () => {
    let now = Date.now();
    let firstOrganization = new Organization('org1');
    let firstAppointment = new Appointment(new Date(now + 30000), new Date(now + 90000), firstOrganization);
    await dbConnect.getRepository(Organization).save(firstOrganization);
    await dbConnect.getRepository(Appointment).save(firstAppointment);

    expect(
      await appointmentRepo.CheckIfAppointmentExistsForThisRange(
        new Date(now + 10000),
        new Date(now + 20000),
        firstOrganization.id,
      ),
    ).toBe(false);
    expect(
      await appointmentRepo.CheckIfAppointmentExistsForThisRange(
        new Date(now + 40000),
        new Date(now + 70000),
        firstOrganization.id,
      ),
    ).toBe(true);
    expect(
      await appointmentRepo.CheckIfAppointmentExistsForThisRange(
        new Date(now + 70000),
        new Date(now + 100000),
        firstOrganization.id,
      ),
    ).toBe(true);
    expect(
      await appointmentRepo.CheckIfAppointmentExistsForThisRange(
        new Date(now + 20000),
        new Date(now + 100000),
        firstOrganization.id,
      ),
    ).toBe(true);
  });
});
