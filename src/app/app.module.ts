import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProgramaComponent } from './pages/programa/programa.component';
import { AdmisionComponent } from './pages/admision/admision.component';
import { AcademicosComponent } from './pages/academicos/academicos.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AuthInterceptor } from './services/auth.interceptor';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticiasComponent,
    HomeComponent,
    InicioComponent,
    ProgramaComponent,
    AdmisionComponent,
    AcademicosComponent,
    EstudiantesComponent,
    LoginComponent,
    ErrorHandlerComponent,
    UsuariosComponent,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
