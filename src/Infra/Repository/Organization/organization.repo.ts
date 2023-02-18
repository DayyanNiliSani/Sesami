import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Organization from 'src/Domain/Models/Organization';
import { Repository } from 'typeorm';
import { UpsertOrganizationDto } from './organization.repo.dto';

@Injectable()
export default class OrganizationRepo {
  public constructor(@InjectRepository(Organization) private repo: Repository<Organization>) {}

  public async create(dto: UpsertOrganizationDto): Promise<Organization> {
    const model = new Organization(dto.title);
    await this.repo.save(model);
    return model;
  }

  public async GetAll(): Promise<Organization[]> {
    const models = await this.repo.find({
      relations: {
        appointments: true,
      },
    });
    return models;
  }

  public async Get(id: number): Promise<Organization> {
    const model = await this.repo.findOne({
      where: { id },
      relations: {
        appointments: true,
      },
    });
    return model;
  }

  public async Update(model: Organization): Promise<Organization> {
    await this.repo.save(model);
    return model;
  }
}
