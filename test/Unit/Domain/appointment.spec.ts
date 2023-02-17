import { InvalidDateRange } from 'src/Domain/Errors/InvalidDateRange.error';
import Appointment from 'src/Domain/Models/Appointment';

describe('AppointmentEntity', () => {
  it('start is bigger than end', () => {
    expect(() => new Appointment(new Date(Date.now() - 30000), new Date(Date.now() + 40000))).toThrowError(
      InvalidDateRange,
    );
  });

  it('start is less than now', () => {
    expect(() => new Appointment(new Date('2021-02-16T14:22:53.456Z'), new Date(Date.now()))).toThrowError(
      InvalidDateRange,
    );
  });
});
