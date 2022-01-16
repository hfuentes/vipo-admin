import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProgramaComponent } from './pages/programa/programa.component';
import { AdmisionComponent } from './pages/admision/admision.component';
import { AcademicosComponent } from './pages/academicos/academicos.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'programa', component: ProgramaComponent },
  { path: 'admision', component: AdmisionComponent },
  { path: 'academicos', component: AcademicosComponent },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'usuarios', component: UsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
