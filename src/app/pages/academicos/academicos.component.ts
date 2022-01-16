import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ErrorHandler, Error } from 'src/app/components/error-handler/error-handler.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-academicos',
  templateUrl: './academicos.component.html',
  styleUrls: ['./academicos.component.css']
})
export class AcademicosComponent implements OnInit {

  @ViewChild('imagenInput')
  imagenInput?: ElementRef;

  loadSettings: ErrorHandler = {
    loading: false,
    error: undefined
  };
  academicos: any;
  form = this.formBuilder.group({
    id: [''],
    imagen: [null],
    nombre: ['', Validators.required],
    correo: ['', Validators.required],
    cargo: ['', Validators.required],
    resumen: [''],
    publicaciones: [''],
    proyectos: [''],
    publicado: [false]
  });

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.resetLoading();
    this.apiService
      .getAcademicos()
      .then((data) => this.setAcademicos(data))
      .then(() => this.form.reset())
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  delete(id: string) {
    if (confirm('¿Confirma que desea eliminar el registro?')) {
      this.resetLoading();
      this.apiService.deleteAcademico(id)
        .then(() => this.apiService.getAcademicos())
        .then((data) => this.setAcademicos(data))
        .then(() => this.form.reset())
        .catch((err) => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  loadEdit(id: string) {
    this.resetLoading();
    this.apiService.getAcademico(id)
      .then(data => this.form.patchValue(data))
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  onSubmit() {
    const id = this.form.value.id;
    if (!id) {
      this.resetLoading();
      this.apiService.createAcademico(this.form.value)
        .then(() => this.apiService.getAcademicos())
        .then(data => this.setAcademicos(data))
        .then(() => this.resetForm())
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    } else {
      this.resetLoading();
      this.apiService.updateAcademico(id, this.form.value)
        .then(() => this.apiService.getAcademicos())
        .then(data => this.setAcademicos(data))
        .then(() => this.resetForm())
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  updatePublicar(id: string, publicado: Boolean) {
    this.resetLoading();
    this.apiService.updateAcademico(id, { publicado })
      .then(() => this.apiService.getAcademicos())
      .then(data => this.setAcademicos(data))
      .then(() => this.resetForm())
      .catch(err => this.handleCatch(err))
      .finally(() => this.handleFinally());
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

  removeImage() {
    if (this.imagenInput) {
      this.imagenInput.nativeElement.value = '';
    }
    this.form.patchValue({ imagen: '' });
  }

  setAcademicos(data: any) {
    this.academicos = data;
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

  resetForm() {
    this.form.reset();
    this.form.patchValue({ publicado: false });
    this.removeImage();
  }

}
