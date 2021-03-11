import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IncidentRoutingModule } from './incident-routing.module';
import { IncidentComponent } from './incident.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [IncidentComponent],
  imports: [SharedModule, IncidentRoutingModule, NgbDatepickerModule],
})
export class IncidentModule {}
