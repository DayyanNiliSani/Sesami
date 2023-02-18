import { Injectable, NotFoundException } from '@nestjs/common';
import OrganizationRepo from 'src/Infra/Repository/Organization/organization.repo';
import {
  mapOrganizationToDto,
  UpsertOrganizationDto,
  ReadOrganizationDto,
} from 'src/Infra/Repository/Organization/organization.repo.dto';

@Injectable()
export default class OrganizationService {
  public constructor(private repo: OrganizationRepo) {}

  public async create(dto: UpsertOrganizationDto): Promise<ReadOrganizationDto> {
    const model = await this.repo.create(dto);
    return mapOrganizationToDto(model);
  }

  public async update(id: number, dto: UpsertOrganizationDto): Promise<ReadOrganizationDto> {
    let model = await this.repo.Get(id);
    if (!model) throw new NotFoundException();
    model.title = dto.title;
    model = await this.repo.Update(model);
    return mapOrganizationToDto(model);
  }

  public async getAll(): Promise<ReadOrganizationDto[]> {
    return (await this.repo.GetAll()).map((a) => mapOrganizationToDto(a));
  }
}
