import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit {
  @Input() loading = false;
  @Input() error?: Error = undefined;
  @Input() settings?: Settings = new Settings();

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    if (!this.settings) {
      this.settings = new Settings();
    }
  }

  close(): void {
    this.error = undefined;
  }
}

export class ErrorHandler {
  loading = false;
  error?: Error = undefined;
  settings?: Settings = new Settings();
}

export class Error {
  message?: string;
  type?: ErrorType;
  showClose?: boolean;
  constructor(error: Error) {
    this.message = error.message || 'Ha ocurrido un error, por favor intenta nuevamente.';
    this.type = error.type || ErrorType.danger;
    this.showClose = error.showClose ? error.showClose : false;
  }
  static handleServiceError(message: string, showClose?: boolean): Error {
    return new Error({ message, showClose });
  }
}

export enum ErrorType {
  primary = 'alert-primary',
  secondary = 'alert-secondary',
  success = 'alert-success',
  danger = 'alert-danger',
  warning = 'alert-warning',
  info = 'alert-info',
  light = 'alert-light',
  dark = 'alert-dark'
}

export class Settings {
  style?: LoadingStyle;
  type?: LoadingType;
  place?: LoadingPlace;
  constructor(settings?: any) {
    this.style = settings && settings.style ? settings.style : LoadingStyle.border;
    this.type = settings && settings.type ? settings.type : LoadingType.primary;
    this.place = settings && settings.place ? settings.place : LoadingPlace.textCenter;
  }
}

export enum LoadingStyle {
  border = 'spinner-border',
  grow = 'spinner-grow',
  borderSm = 'spinner-border spinner-border-sm',
  growSm = 'spinner-grow spinner-grow-sm'

}

export enum LoadingType {
  primary = 'text-primary',
  secondary = 'text-secondary',
  success = 'text-success',
  danger = 'text-danger',
  warning = 'text-warning',
  info = 'text-info',
  light = 'text-light',
  dark = 'text-dark'
}

export enum LoadingPlace {
  textLeft = 'text-left',
  textRight = 'text-right',
  textCenter = 'text-center'
}
