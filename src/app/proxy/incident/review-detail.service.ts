import type { CreateReviewDetailDto, GetReviewDetailListDto, ReviewDetailDto, UpdateReviewDetailDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewDetailService {
  apiName = 'Default';

  create = (input: CreateReviewDetailDto) =>
    this.restService.request<any, ReviewDetailDto>({
      method: 'POST',
      url: `/api/app/review-detail`,
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/review-detail/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ReviewDetailDto>({
      method: 'GET',
      url: `/api/app/review-detail/${id}`,
    },
    { apiName: this.apiName });

  getByIncidentDetailId = (id: string) =>
    this.restService.request<any, ReviewDetailDto>({
      method: 'GET',
      url: `/api/app/review-detail/${id}/by-incident-detail-id`,
    },
    { apiName: this.apiName });

  getList = (input: GetReviewDetailListDto) =>
    this.restService.request<any, PagedResultDto<ReviewDetailDto>>({
      method: 'GET',
      url: `/api/app/review-detail`,
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: UpdateReviewDetailDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/review-detail/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
