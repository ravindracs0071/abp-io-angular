import type { GetIncidentListDto, IncidentDto, UpdateIncidentDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  apiName = 'Default';

  create = () =>
    this.restService.request<any, IncidentDto>({
      method: 'POST',
      url: `/api/app/incident`,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/incident/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, IncidentDto>({
      method: 'GET',
      url: `/api/app/incident/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetIncidentListDto) =>
    this.restService.request<any, PagedResultDto<IncidentDto>>({
      method: 'GET',
      url: `/api/app/incident`,
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: number, input: UpdateIncidentDto) =>
    this.restService.request<any, IncidentDto>({
      method: 'PUT',
      url: `/api/app/incident/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
