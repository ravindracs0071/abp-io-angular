import { Component } from '@angular/core';
import { RoutesService, eLayoutType } from '@abp/ng.core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
}
constructor(routes: RoutesService, private oAuthService: OAuthService) {
  // if (this.hasLoggedIn) {
  //   routes.add([
  //     {
  //       path: 'incident-management',
  //       name: 'Incident management',
  //       order: 101,
  //       iconClass: 'fas fa-cog'
  //     },
  //     {
  //       path: '/incident-management/incidents',
  //       name: 'Incidents',
  //       parentName: 'Incident management',
  //       order: 1,
  //       layout: eLayoutType.application,
  //     },
  //   ]);
  // }
}
}
