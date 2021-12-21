import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ErrorHandler, Error } from 'src/app/components/error-handler/error-handler.component';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

  loadSettings: ErrorHandler = {
    loading: false,
    error: undefined
  };
  form = this.formBuilder.group({
    id: [''],
    descripcion: ['', Validators.required],
    objetivos: ['', Validators.required],
    dirigido: ['', Validators.required],
    plan: ['', Validators.required],
    acreditacion: ['', Validators.required],
    investigacion: ['', Validators.required],
    correo: ['', Validators.required],
    telefono: ['', Validators.required],
    url: ['', Validators.required],
    jornada: ['', Validators.required],
    modalidad: ['', Validators.required],
    caracter: ['', Validators.required],
    dedicacion: ['', Validators.required],
    ahno: ['', Validators.required],
    postulaciones: ['', Validators.required],
    clases: ['', Validators.required],
    valor: ['', Validators.required],
    subvalor: ['', Validators.required],
    pago: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.resetLoading();
    this.apiService.getPrograma()
      .then(data => this.form.patchValue(data))
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  onSubmit() {
    this.resetLoading();
    this.apiService.updatePrograma(this.form.value.id, this.form.value)
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
