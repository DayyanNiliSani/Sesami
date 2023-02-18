import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReadAppointmentDto } from 'src/Infra/Repository/Appointment/appointment.repo.dto';
import AppointmentService from 'src/Service/Appointment/Appointment.service';
import { CreateAppointmentRequest, UpdateAppointmentRequest } from '../Dtos/Requests/Appointment.requests.dto';

@Controller('/appointment/')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Get('/:organizationId')
  async getAll(@Param('organizationId') organizationId: number): Promise<ReadAppointmentDto[]> {
    return await this.service.getAll(organizationId);
  }

  @Post('')
  async create(@Body() body: CreateAppointmentRequest): Promise<ReadAppointmentDto> {
    return await this.service.create(body);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateAppointmentRequest): Promise<ReadAppointmentDto> {
    return await this.service.update(id, body);
  }
}
