import { DataSource } from 'typeorm';
import { Entities } from 'src/Domain/Models';
import Appointment from 'src/Domain/Models/Appointment';
import AppointmentRepo from 'src/Infra/Repository/Appointment/Appointment.repo';

describe('Appointment Repository Tests', () => {
  let dbConnect: DataSource;
  let repo: AppointmentRepo;
  beforeEach(async () => {
    dbConnect = new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      entities: [Appointment],
    });

    await dbConnect.initialize();
    repo = new AppointmentRepo(dbConnect.getRepository(Appointment));
  });

  it('CheckIfAppointmentExistsForThisRange', async () => {
    let now = Date.now();
    let firstAppointment = new Appointment(new Date(now + 30000), new Date(now + 90000));
    await dbConnect.getRepository(Appointment).save(firstAppointment);

    expect(await repo.CheckIfAppointmentExistsForThisRange(new Date(now + 10000), new Date(now + 20000))).toBe(false);
    expect(await repo.CheckIfAppointmentExistsForThisRange(new Date(now + 40000), new Date(now + 70000))).toBe(true);
    expect(await repo.CheckIfAppointmentExistsForThisRange(new Date(now + 70000), new Date(now + 100000))).toBe(true);
    expect(await repo.CheckIfAppointmentExistsForThisRange(new Date(now + 20000), new Date(now + 100000))).toBe(true);
  });
});
