import type { PropertySettingValue } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntitySettingsService {
  apiName = 'Default';

  get = () =>
    this.restService.request<any, Record<string, PropertySettingValue>>({
      method: 'GET',
      url: `/api/app/entity-settings`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
