import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { InvalidDateRange } from '../Errors/InvalidDateRange.error';

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
