import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentComponent } from './incident.component';
import { AuthGuard, PermissionGuard } from '@abp/ng.core';
const routes: Routes = [{ path: '', component: IncidentComponent, canActivate: [AuthGuard, PermissionGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentRoutingModule {}



