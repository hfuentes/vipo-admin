import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ErrorHandler, Error } from 'src/app/components/error-handler/error-handler.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  loadSettings: ErrorHandler = {
    loading: false,
    error: undefined
  };
  noticias: any;
  form = this.formBuilder.group({
    id: [''],
    imagen: [null],
    titulo: ['', Validators.required],
    bajada: [''],
    cuerpo: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.resetLoading();
    this.apiService
      .getNoticias()
      .then((data) => this.setNoticias(data))
      .then(() => this.form.reset())
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  delete(id: string) {
    this.resetLoading();
    this.apiService.deleteNoticia(id)
      .then(() => this.apiService.getNoticias())
      .then((data) => this.setNoticias(data))
      .then(() => this.form.reset())
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  loadEdit(id: string) {
    this.resetLoading();
    this.apiService.getNoticia(id)
      .then(data => this.form.patchValue(data))
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  onSubmit() {
    const id = this.form.value.id;
    if (!id) {
      this.resetLoading();
      this.apiService.createNoticia(this.form.value)
        .then(() => this.apiService.getNoticias())
        .then(data => this.setNoticias(data))
        .then(() => this.resetForm())
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    } else {
      this.resetLoading();
      this.apiService.updateNoticia(id, this.form.value)
        .then(() => this.apiService.getNoticias())
        .then(data => this.setNoticias(data))
        .then(() => this.resetForm())
        .catch(err => this.handleCatch(err))
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

  setNoticias(data: any) {
    this.noticias = data;
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
  }

}
