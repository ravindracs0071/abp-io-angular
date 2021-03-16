import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application
      },
      {
        path: 'incident-management',
        name: '::Menu:Incident',
        order: 101,
        iconClass: 'fas fa-cog',
        requiredPolicy: 'Demo.Incidents',
      },
      {
        path: '/incident-management/incidents',
        name: '::SubMenu:Incident',
        parentName: 'Incident management',
        order: 1,
        layout: eLayoutType.application,
        requiredPolicy: 'Demo.Incidents',
      },
    ]);
  };
}
