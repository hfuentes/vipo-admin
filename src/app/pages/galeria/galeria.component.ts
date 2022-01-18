import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ErrorHandler, Error } from 'src/app/components/error-handler/error-handler.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  @ViewChild('imagenInput')
  imagenInput?: ElementRef;

  loadSettings: ErrorHandler = {
    loading: false,
    error: undefined
  };
  galeriaLista: any;
  form = this.formBuilder.group({
    id: [''],
    imagen: [null, Validators.required],
    texto: [''],
    publicado: [false]
  });

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.resetLoading();
    this.apiService.getGaleriaLista()
      .then(data => this.setGaleriaLista(data))
      .catch(err => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  onSubmit() {
    const id = this.form.value.id;
    if (!id) {
      this.resetLoading();
      this.apiService.createGaleriaImagen(this.form.value)
        .then(() => this.apiService.getGaleriaLista())
        .then(data => this.setGaleriaLista(data))
        .then(() => this.resetForm())
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    } else {
      this.resetLoading();
      this.apiService.updateGaleriaImagen(id, this.form.value)
        .then(() => this.apiService.getGaleriaLista())
        .then(data => this.setGaleriaLista(data))
        .then(() => this.resetForm())
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  removeImage() {
    if (this.imagenInput) {
      this.imagenInput.nativeElement.value = '';
    }
    this.form.patchValue({ imagen: '' });
  }

  loadEdit(id: string) {
    this.resetLoading();
    this.apiService.getGaleriaImagen(id)
      .then(data => this.form.patchValue(data))
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  updatePublicar(id: string, publicado: Boolean) {
    this.resetLoading();
    this.apiService.updateGaleriaImagen(id, { publicado })
      .then(() => this.apiService.getGaleriaLista())
      .then(data => (this.setGaleriaLista(data), this.resetForm()))
      .catch(err => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  delete(id: string) {
    if (confirm('¿Confirma que desea eliminar el registro?')) {
      this.resetLoading();
      this.apiService.deleteGaleriaImagen(id)
        .then(() => this.apiService.getGaleriaLista())
        .then((data) => (this.setGaleriaLista(data), this.resetForm()))
        .catch((err) => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.patchValue({ imagen: reader.result });
        this.cd.markForCheck();
      };
    }
  }

  resetForm() {
    this.form.reset();
    this.form.patchValue({ publicado: false });
  }

  setGaleriaLista(data: any) {
    this.galeriaLista = data;
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
