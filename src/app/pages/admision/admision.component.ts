import { Component, OnInit } from '@angular/core';
import { ErrorHandler, Error } from 'src/app/components/error-handler/error-handler.component';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styleUrls: ['./admision.component.css']
})
export class AdmisionComponent implements OnInit {

  loadSettings: ErrorHandler = {
    loading: false,
    error: undefined
  };
  form = this.formBuilder.group({
    id: [''],
    fechas: [''],
    requisitos: [''],
    becas: [''],
    postula: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.resetLoading();
    this.apiService.getAdmision()
      .then(data => this.form.patchValue(data))
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  onSubmit() {
    this.resetLoading();
    this.apiService.updateAdmision(this.form.value.id, this.form.value)
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  handleCatch(err: any) {
    this.loadSettings.error = Error.handleServiceError(err);
  }

  handleFinally() {
    this.loadSettings.loading = false;
  }

  resetLoading() {
    this.loadSettings.loading = true;
    this.loadSettings.error = undefined;
  }

}
