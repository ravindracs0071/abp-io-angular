import { RoutesService, eLayoutType } from "@abp/ng.core";
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
/**
 *
 */
constructor(routes: RoutesService) {
  routes.add([
    {
      path: 'incident-management',
      name: 'Incident management',
      order: 101,
      iconClass: 'fas fa-cog',
    },
    {
      path: '/incident-management/incidents',
      name: 'Incidents',
      parentName: 'Incident management',
      order: 1,
      layout: eLayoutType.application,
    },
  ]);
}

}
