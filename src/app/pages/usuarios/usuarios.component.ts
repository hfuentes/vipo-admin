import { Component, OnInit } from '@angular/core';
import { ErrorHandler, Error } from 'src/app/components/error-handler/error-handler.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  loadSettings: ErrorHandler = {
    loading: false,
    error: undefined
  };
  form = this.formBuilder.group({
    id: [''],
    nombre: ['', Validators.required],
    password: ['', Validators.required],
    activo: [false, Validators.required],
    esAdmin: [false, Validators.required]
  });
  usuarios: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.resetLoading();
    this.apiService.getUsuarios()
      .then(data => this.setUsuarios(data))
      .catch(err => this.handleCatch(err))
      .finally(() => this.handleFinally());
    this.form.get('id')?.valueChanges.subscribe(value => {
      if (value && value !== '') this.form.get('password')?.clearValidators();
      else this.form.get('password')?.setValidators(Validators.required);
    });
  }

  loadEdit(id: string) {
    this.resetLoading();
    this.apiService.getUsuario(id)
      .then(data => this.form.patchValue(data))
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  setUsuarios(data: any) {
    this.usuarios = data;
  }

  onSubmit() {
    this.resetLoading();
    const id = this.form.value.id;
    if (!id) {
      this.apiService.createUsuario(this.form.value)
        .then(() => this.apiService.getUsuarios())
        .then(data => (this.setUsuarios(data), this.resetForm()))
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    } else {
      let data = this.form.value;
      if (data.password === '') delete data.password;
      this.apiService.updateUsuario(id, this.form.value)
        .then(() => this.apiService.getUsuarios())
        .then(data => (this.setUsuarios(data), this.resetForm()))
        .catch(err => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  updateActivo(id: string, activo: Boolean) {
    this.resetLoading();
    this.apiService.updateUsuario(id, { activo })
      .then(() => this.apiService.getUsuarios())
      .then(data => (this.setUsuarios(data), this.resetForm()))
      .catch(err => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  delete(id: string) {
    if (confirm('¿Confirma que desea eliminar el registro?')) {
      this.resetLoading();
      this.apiService.deleteUsuario(id)
        .then(() => this.apiService.getUsuarios())
        .then((data) => (this.setUsuarios(data), this.resetForm()))
        .catch((err) => this.handleCatch(err))
        .finally(() => this.handleFinally());
    }
  }

  resetForm() {
    this.form.reset();
    this.form.patchValue({ nombre: '' });
    this.form.patchValue({ activo: false });
    this.form.patchValue({ esAdmin: false });
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
