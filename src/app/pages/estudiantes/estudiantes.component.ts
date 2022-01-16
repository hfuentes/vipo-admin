import { Component, OnInit } from '@angular/core';
import { ErrorHandler, Error } from 'src/app/components/error-handler/error-handler.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  loadSettings: ErrorHandler = {
    loading: false,
    error: undefined
  };
  estudiantes: any;
  tesis: any;
  formEstudiantes = this.formBuilder.group({
    id: [''],
    nombre: ['', Validators.required],
    egreso: ['', Validators.required],
    publicado: [false]
  });
  formTesis = this.formBuilder.group({
    id: [''],
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    profesor: ['', Validators.required],
    tutor: [''],
    coautor: [''],
    publicacion: ['', Validators.required],
    publicado: [false]
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.resetLoading();
    this.apiService.getEstudiantes()
      .then(data => (this.setEstudiantes(data), this.apiService.getTesisLista()))
      .then(data => this.setTesis(data))
      .catch(err => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  onSubmitEstudiantes() {
    const id = this.formEstudiantes.value.id;
    if (!id) {
      this.resetLoading();
      this.apiService.createEstudiante(this.formEstudiantes.value)
        .then(() => this.apiService.getEstudiantes())
        .then(data => this.setEstudiantes(data))
        .then(() => this.resetFormEstudiantes())
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    } else {
      this.resetLoading();
      this.apiService.updateEstudiante(id, this.formEstudiantes.value)
        .then(() => this.apiService.getEstudiantes())
        .then(data => this.setEstudiantes(data))
        .then(() => this.resetFormEstudiantes())
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  onSubmitTesis() {
    const id = this.formTesis.value.id;
    if (!id) {
      this.resetLoading();
      this.apiService.createTesis(this.formTesis.value)
        .then(() => this.apiService.getTesisLista())
        .then(data => this.setTesis(data))
        .then(() => this.resetFormTesis())
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    } else {
      this.resetLoading();
      this.apiService.updateTesis(id, this.formTesis.value)
        .then(() => this.apiService.getTesisLista())
        .then(data => this.setTesis(data))
        .then(() => this.resetFormTesis())
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  loadEditEstudiante(id: string) {
    this.resetLoading();
    this.apiService.getEstudiante(id)
      .then(data => this.formEstudiantes.patchValue(data))
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  loadEditTesis(id: string) {
    this.resetLoading();
    this.apiService.getTesis(id)
      .then(data => this.formTesis.patchValue(data))
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  updatePublicarEstudiante(id: string, publicado: Boolean) {
    this.resetLoading();
    this.apiService.updateEstudiante(id, { publicado })
      .then(() => this.apiService.getEstudiantes())
      .then(data => (this.setEstudiantes(data), this.resetFormEstudiantes()))
      .catch(err => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  updatePublicarTesis(id: string, publicado: Boolean) {
    this.resetLoading();
    this.apiService.updateTesis(id, { publicado })
      .then(() => this.apiService.getTesisLista())
      .then(data => (this.setTesis(data), this.resetFormTesis()))
      .catch(err => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  deleteEstudiante(id: string) {
    if (confirm('¿Confirma que desea eliminar el registro?')) {
      this.resetLoading();
      this.apiService.deleteEstudiante(id)
        .then(() => this.apiService.getEstudiantes())
        .then((data) => (this.setEstudiantes(data), this.formEstudiantes.reset()))
        .catch((err) => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  deleteTesis(id: string) {
    if (confirm('¿Confirma que desea eliminar el registro?')) {
      this.resetLoading();
      this.apiService.deleteTesis(id)
        .then(() => this.apiService.getTesisLista())
        .then((data) => (this.setTesis(data), this.formTesis.reset()))
        .catch((err) => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  setEstudiantes(data: any) {
    this.estudiantes = data;
  }

  setTesis(data: any) {
    this.tesis = data;
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

  resetFormEstudiantes() {
    this.formEstudiantes.reset();
    this.formEstudiantes.patchValue({ publicado: false });
  }

  resetFormTesis() {
    this.formTesis.reset();
    this.formTesis.patchValue({ publicado: false });
  }

}
