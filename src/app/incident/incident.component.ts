import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { IncidentService, IncidentDetailService, IncidentDto, IncidentDetailDto, UpdateIncidentDto } from '@proxy/incident';
import { ReviewDetailService, ReviewDetailDto, CreateReviewDetailDto, UpdateReviewDetailDto } from '@proxy/incident';
import {PropertySettingValue, EntitySettingsService } from '@proxy/property-setting';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
})
export class IncidentComponent implements OnInit {
  propertySetting = {} as Record<string, PropertySettingValue>;
  incident = { items: [], totalCount: 0 } as PagedResultDto<IncidentDetailDto>;
  selectIncidentNo: string;
  isModalOpen = false;
  isReviewModalOpen = false;

  form: FormGroup;
  formReview: FormGroup;

  selectedIncident = {} as IncidentDetailDto;
  updateIncidentDto = {} as UpdateIncidentDto;

  selectedReviewDetail = {} as ReviewDetailDto;
  updateReviewDetailDto = {} as UpdateReviewDetailDto;

  constructor(
    public readonly list: ListService,
    private entitySetting: EntitySettingsService,
    private incidentService: IncidentService,
    private incidentDetailService: IncidentDetailService,
    private reviewDetailService: ReviewDetailService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(): void {
    const incidentStreamCreator = (query) => this.incidentDetailService.getList(query);
    // tslint:disable-next-line: deprecation
    this.entitySetting.get().subscribe((responseA) => { 
        this.propertySetting =  responseA; 
        // tslint:disable-next-line: deprecation
        this.list.hookToQuery(incidentStreamCreator).subscribe(
          response => {
            this.incident = response;
          });
    });
  }

  createIncident() {
    this.selectedIncident = {} as IncidentDetailDto;
    // tslint:disable-next-line: deprecation
    this.incidentService.create().subscribe((incident) => {
      this.selectedIncident.incidentMasterId = incident.id;
      this.selectedIncident.incidentNo = incident.incidentNo;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  editIncident(id: string) {
    // tslint:disable-next-line: deprecation
    this.incidentDetailService.get(id).subscribe((incident) => {
      this.selectedIncident = incident;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  reviewIncident(id: string, incidentNo: string) {
    this.selectIncidentNo = incidentNo;
    this.selectedReviewDetail.incidentDetailId = id;
    // tslint:disable-next-line: deprecation
    this.reviewDetailService.getByIncidentDetailId(id).subscribe((reviewDetailDto) => {
      if (reviewDetailDto) {
        this.selectedReviewDetail = reviewDetailDto;
      }
      this.buildFormReview();
      this.isReviewModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      incidentMasterId: [this.selectedIncident.incidentMasterId || '', Validators.required],
      incidentNo: [this.selectedIncident.incidentNo || '', Validators.required],
      incidentDescr: [this.selectedIncident.incidentDescr || '', Validators.required],
      incidentType: [this.selectedIncident.incidentType || ''],
      occurenceDate: [this.selectedIncident.occurenceDate ? new Date(this.selectedIncident.occurenceDate) : null],
      reportTo: [this.selectedIncident.reportTo || ''],
    });
  }

  buildFormReview() {
    this.formReview = this.fb.group({
      incidentDetailId: [this.selectedReviewDetail.incidentDetailId || '', Validators.required],
      isIncidentValid: [this.selectedReviewDetail.isIncidentValid || true, Validators.required],
      comments: [this.selectedReviewDetail.comments || ''],
      incidentStatus: [this.selectedReviewDetail.incidentStatus || ''],
      endDate: [this.selectedReviewDetail.endDate ? new Date(this.selectedReviewDetail.endDate) : null],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.incidentType === '' || this.form.value.incidentType === null) {
      this.form.value.incidentType = '0';
    }

    if (this.selectedIncident.id) {
      // tslint:disable-next-line: deprecation
      this.incidentDetailService.update(this.selectedIncident.id, this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      });
    } else {
      // tslint:disable-next-line: deprecation
      this.incidentDetailService.create(this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      });
    }
  }

  saveReview() {
    if (this.formReview.invalid) {
      return;
    }

    if (this.selectedReviewDetail.id) {
      // tslint:disable-next-line: deprecation
      this.reviewDetailService.update(this.selectedReviewDetail.id, this.formReview.value).subscribe(() => {
        this.isReviewModalOpen = false;
        this.formReview.reset();
        this.list.get();
      });
    } else {
      // tslint:disable-next-line: deprecation
      this.reviewDetailService.create(this.formReview.value).subscribe(() => {
        this.isReviewModalOpen = false;
        this.formReview.reset();
        this.list.get();
      });
    }
  }

  delete(id: string) {
    // tslint:disable-next-line: deprecation
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        // tslint:disable-next-line: deprecation
        this.incidentDetailService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
