import Appointment from 'src/Domain/Models/Appointment';

export interface UpsertAppointmentDto {
  start: Date;
  end: Date;
}

export interface ReadAppointmentDto extends UpsertAppointmentDto {
  id: number;
  updateAt: Date;
  createAt: Date;
}

export function mapAppointmentToDto(model: Appointment): ReadAppointmentDto {
  return {
    id: model.id,
    createAt: model.createAt,
    updateAt: model.updateAt,
    end: model.end,
    start: model.start,
  };
}
