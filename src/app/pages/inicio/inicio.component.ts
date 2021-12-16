import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ErrorHandler, Error } from 'src/app/components/error-handler/error-handler.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @ViewChild('slide1Input')
  slide1Input?: ElementRef;

  @ViewChild('slide2Input')
  slide2Input?: ElementRef;

  @ViewChild('slide3Input')
  slide3Input?: ElementRef;

  @ViewChild('slide4Input')
  slide4Input?: ElementRef;

  @ViewChild('admisionInput')
  admisionInput?: ElementRef;

  @ViewChild('conocenosInput')
  conocenosInput?: ElementRef;

  @ViewChild('planInput')
  planInput?: ElementRef;

  @ViewChild('acreditacionInput')
  acreditacionInput?: ElementRef;

  loadSettings: ErrorHandler = {
    loading: false,
    error: undefined
  };
  form = this.formBuilder.group({
    id: [''],
    slide1: [''],
    slide2: [''],
    slide3: [''],
    slide4: [''],
    video: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
    email: ['', Validators.email],
    admision: [''],
    conocenos: [''],
    plan: [''],
    acreditacion: [''],
    facebook: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
    twitter: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
    instagram: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
    noticia1: [''],
    noticia2: [''],
    noticia3: [''],
  });
  get noticia1() { return this.form.get('noticia1'); }
  get noticia2() { return this.form.get('noticia2'); }
  get noticia3() { return this.form.get('noticia3'); }
  noticias: any;

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.resetLoading();
    this.apiService
      .getNoticiasActivas()
      .then(data => this.setNoticias(data))
      .catch((err) => this.handleCatch(err))
      .finally(() => this.handleFinally());
  }

  setNoticias(data: any) {
    this.noticias = data;
  }

  resetLoading() {
    this.loadSettings.loading = true;
    this.loadSettings.error = undefined;
  }

  handleCatch(err: any) {
    this.loadSettings.error = Error.handleServiceError(err);
  }

  handleFinally() {
    this.loadSettings.loading = false;
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onImageChange(formControlName: string, event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        let patch: any = {};
        patch[formControlName] = reader.result;
        this.form.patchValue(patch);
        this.cd.markForCheck();
      };
    }
  }

  onNoticiaChange(formControlName: string, event: any) {
    this.form.get(formControlName)?.setValue(event.target.value, {
      onlySelf: true
    });
  }

  removeImage(formControlName: string) {
    switch (formControlName) {
      case 'slide1': if (this.slide1Input) this.slide1Input.nativeElement.value = ''; break;
      case 'slide2': if (this.slide2Input) this.slide2Input.nativeElement.value = ''; break;
      case 'slide3': if (this.slide3Input) this.slide3Input.nativeElement.value = ''; break;
      case 'slide4': if (this.slide4Input) this.slide4Input.nativeElement.value = ''; break;
      case 'admision': if (this.admisionInput) this.admisionInput.nativeElement.value = ''; break;
      case 'conocenos': if (this.conocenosInput) this.conocenosInput.nativeElement.value = ''; break;
      case 'plan': if (this.planInput) this.planInput.nativeElement.value = ''; break;
      case 'acreditacion': if (this.acreditacionInput) this.acreditacionInput.nativeElement.value = ''; break;
    }
    let patch: any = {};
    patch[formControlName] = undefined;
    this.form.patchValue(patch);
  }

}
