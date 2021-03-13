import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateIncidentDetailDto {
  incidentMasterId: number;
  incidentNo: string;
  incidentDescr: string;
  incidentType?: number;
  occurenceDate?: string;
  reportTo?: string;
}

export interface CreateReviewDetailDto {
  incidentDetailId: string;
  isIncidentValid: boolean;
  comments: string;
  incidentStatus?: string;
  endDate?: string;
}

export interface GetIncidentDetailListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetIncidentListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetReviewDetailListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface IncidentDetailDto extends EntityDto<string> {
  incidentMasterId: number;
  incidentNo?: string;
  incidentDescr?: string;
  incidentType?: number;
  occurenceDate?: string;
  reportTo?: string;
  status?: string;
}

export interface IncidentDto extends EntityDto<number> {
  incidentNo?: string;
}

export interface ReviewDetailDto extends EntityDto<string> {
  incidentDetailId?: string;
  isIncidentValid: boolean;
  comments?: string;
  incidentStatus?: string;
  endDate?: string;
}

export interface UpdateIncidentDetailDto {
  incidentNo: string;
  incidentDescr: string;
  incidentType?: number;
  occurenceDate?: string;
  reportTo?: string;
}

export interface UpdateIncidentDto {
  incidentNo: string;
}

export interface UpdateReviewDetailDto {
  isIncidentValid: boolean;
  comments: string;
  incidentStatus?: string;
  endDate?: string;
}
