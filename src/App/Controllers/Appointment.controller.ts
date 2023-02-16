import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReadAppointmentDto } from 'src/Infra/Repository/Appointment/Appointment.repo.dto';
import AppointmentService from 'src/Service/Appointment/Appointment.service';
import UpsertAppointmentRequest from '../Dtos/Requests/Appointment.requests.dto';

@Controller('/appointment/')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Get('')
  async getAll(): Promise<ReadAppointmentDto[]> {
    return await this.service.getAllAppointment();
  }

  @Post('')
  async create(
    @Body() body: UpsertAppointmentRequest,
  ): Promise<ReadAppointmentDto> {
    return await this.service.createAppointment(body);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() body: UpsertAppointmentRequest,
  ): Promise<ReadAppointmentDto> {
    return await this.service.updateAppointment(id, body);
  }
}
