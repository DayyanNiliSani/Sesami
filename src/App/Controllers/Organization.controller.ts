import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReadOrganizationDto } from 'src/Infra/Repository/Organization/organization.repo.dto';
import OrganizationService from 'src/Service/Organization/Organization.service';
import UpsertOrganizationRequest from '../Dtos/Requests/Orgazination.requests.dto';

@Controller('/organization/')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  @Get('')
  async getAll(): Promise<ReadOrganizationDto[]> {
    return await this.service.getAll();
  }

  @Post('')
  async create(@Body() body: UpsertOrganizationRequest): Promise<ReadOrganizationDto> {
    return await this.service.create(body);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpsertOrganizationRequest): Promise<ReadOrganizationDto> {
    return await this.service.update(id, body);
  }
}
