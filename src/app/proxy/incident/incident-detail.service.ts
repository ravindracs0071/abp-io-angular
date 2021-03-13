import type { CreateIncidentDetailDto, GetIncidentDetailListDto, IncidentDetailDto, UpdateIncidentDetailDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IncidentDetailService {
  apiName = 'Default';

  create = (input: CreateIncidentDetailDto) =>
    this.restService.request<any, IncidentDetailDto>({
      method: 'POST',
      url: `/api/app/incident-detail`,
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/incident-detail/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, IncidentDetailDto>({
      method: 'GET',
      url: `/api/app/incident-detail/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetIncidentDetailListDto) =>
    this.restService.request<any, PagedResultDto<IncidentDetailDto>>({
      method: 'GET',
      url: `/api/app/incident-detail`,
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: UpdateIncidentDetailDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/incident-detail/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
