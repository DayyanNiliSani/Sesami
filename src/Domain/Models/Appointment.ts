import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { InvalidDateRange } from '../Errors/InvalidDateRange.error';

@Entity()
class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updateAt: Date;
  public constructor(start?: Date, end?: Date) {
    if (!start || !end) return;
    if (start.getTime() >= end.getTime() || start.getTime() <= Date.now()) {
      throw new InvalidDateRange('start or end of the range is invalid');
    }

    this.start = start;
    this.end = end;
  }
}

export default Appointment;
