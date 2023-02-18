import Organization from 'src/Domain/Models/Organization';
import { mapAppointmentToDto, ReadAppointmentDto } from '../Appointment/appointment.repo.dto';

export interface UpsertOrganizationDto {
  title: string;
}

export interface ReadOrganizationDto extends UpsertOrganizationDto {
  id: number;
  appointments: ReadAppointmentDto[];
}

export function mapOrganizationToDto(model: Organization): ReadOrganizationDto {
  return {
    id: model.id,
    title: model.title,
    appointments: model.appointments ? model.appointments.map((a) => mapAppointmentToDto(a)) : undefined,
  };
}
