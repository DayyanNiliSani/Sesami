import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Appointment from './Appointment';

@Entity()
export default class Organization {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public title: string;

  @OneToMany(() => Appointment, (appointment) => appointment.organization, { cascade: true })
  public appointments: Appointment[];

  public constructor(title?: string) {
    this.title = title;
  }
}
