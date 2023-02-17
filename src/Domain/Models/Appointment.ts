import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InvalidDateRange } from '../Errors/InvalidDateRange.error';
import AppointmentChanges from './AppointmentChanges';
import Organization from './Organization';

@Entity()
class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  start: Date;

  @Column({ type: 'varchar', nullable: false })
  end: Date;

  @CreateDateColumn()
  public createAt: Date;

  @UpdateDateColumn()
  public updateAt: Date;

  @OneToMany(() => AppointmentChanges, (appointmentChanges) => appointmentChanges.appointment, { cascade: true })
  public changes: AppointmentChanges[];

  @ManyToOne(() => Organization, (organization) => organization.appointments)
  public organization: Organization;

  public constructor(start?: Date, end?: Date, organization?: Organization) {
    if (!start || !end) return;
    if (start.getTime() >= end.getTime() || start.getTime() <= Date.now()) {
      throw new InvalidDateRange('start or end of the range is invalid');
    }

    this.start = start;
    this.end = end;
    this.organization = organization;
  }
}

export default Appointment;
