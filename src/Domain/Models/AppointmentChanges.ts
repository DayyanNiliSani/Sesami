import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableForeignKey,
  UpdateDateColumn,
} from 'typeorm';
import Appointment from './Appointment';

@Entity()
class AppointmentChanges {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  start: Date;

  @Column({ type: 'varchar', nullable: false })
  end: Date;

  @CreateDateColumn()
  public createAt: Date;

  @ManyToOne(() => Appointment, (appointment) => appointment.changes)
  appointment: Appointment;
}

export default AppointmentChanges;
