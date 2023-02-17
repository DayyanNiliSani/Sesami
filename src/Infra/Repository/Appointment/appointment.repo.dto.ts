import Appointment from 'src/Domain/Models/Appointment';

export interface CreateAppointmentDto {
  start: Date;
  end: Date;
  organizationId: number;
}

export interface UpdateAppointmentDto {
  start: Date;
  end: Date;
}

export interface ReadAppointmentDto {
  id: number;
  updateAt: Date;
  createAt: Date;
  changes: ReadAppointmentChangesDto[];
  start: Date;
  end: Date;
}

export interface ReadAppointmentChangesDto {
  id: number;
  start: Date;
  end: Date;
  createdAt: Date;
}

export function mapAppointmentToDto(model: Appointment): ReadAppointmentDto {
  return {
    id: model.id,
    createAt: model.createAt,
    updateAt: model.updateAt,
    end: model.end,
    start: model.start,
    changes: model.changes
      ? model.changes.map((c) => {
          return {
            createdAt: c.createAt,
            id: c.id,
            end: c.end,
            start: c.start,
          };
        })
      : undefined,
  };
}
