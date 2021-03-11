import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
// import { IncidentService, IncidentDto } from '@proxy/incidents';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
})
export class IncidentComponent implements OnInit {
  incident = { items: [], totalCount: 0 } as PagedResultDto<IncidentDto>;

  isModalOpen = false;

  form: FormGroup;

  selectedIncident = {} as IncidentDto;

  constructor(
    public readonly list: ListService,
    private incidentService: IncidentService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(): void {
    const incidentStreamCreator = (query) => this.incidentService.getList(query);

    this.list.hookToQuery(incidentStreamCreator).subscribe((response) => {
      this.incident = response;
    });
  }

  createIncident() {
    this.selectedIncident = {} as IncidentDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editIncident(id: string) {
    this.incidentService.get(id).subscribe((incident) => {
      this.selectedIncident = incident;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedIncident.name || '', Validators.required],
      birthDate: [
        this.selectedIncident.birthDate ? new Date(this.selectedIncident.birthDate) : null,
        Validators.required,
      ],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    if (this.selectedIncident.id) {
      this.incidentService.update(this.selectedIncident.id, this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      });
    } else {
      this.incidentService.create(this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      });
    }
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.incidentService.delete(id).subscribe(() => this.list.get());
      }
    });
  }  
}
