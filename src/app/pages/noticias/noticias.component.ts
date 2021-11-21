import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ErrorHandler, Error } from 'src/app/components/error-handler/error-handler.component';

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

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadSettings.loading = true;
    this.loadSettings.error = undefined;
    this.apiService.getNoticias().then(data => {
      this.noticias = data;
    }).catch((err: any) => {
      this.loadSettings.error = Error.handleServiceError(err);
    }).finally(() => {
      this.loadSettings.loading = false;
    });
  }

  delete(id: string) {
    this.loadSettings.loading = true;
    this.loadSettings.error = undefined;
    this.apiService.deleteNoticia(id).then(() => {
      return this.apiService.getNoticias();
    }).then(data => {
      this.noticias = data;
    }).catch((err: any) => {
      this.loadSettings.error = Error.handleServiceError(err);
    }).finally(() => {
      this.loadSettings.loading = false;
    });
  }

}
