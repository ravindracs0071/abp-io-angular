import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageTextService {
  apiName = 'Default';

  getAllValuesFromDatabaseBySourceNameAndLanguageName = (sourceName: string, languageName: string) =>
    this.restService.request<any, Record<string, string>>({
      method: 'GET',
      url: `/api/app/language-text/values-from-database`,
      params: { sourceName: sourceName, languageName: languageName },
    },
    { apiName: this.apiName });

  getAllValuesFromDatabaseForCultureByCultureName = (cultureName: string) =>
    this.restService.request<any, Record<string, string>>({
      method: 'GET',
      url: `/api/app/language-text/values-from-database-for-culture`,
      params: { cultureName: cultureName },
    },
    { apiName: this.apiName });

  getByCultureNameAndName = (cultureName: string, name: string) =>
    this.restService.request<any, any<string,string>>({
      method: 'GET',
      url: `/api/app/language-text`,
      params: { cultureName: cultureName, name: name },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
