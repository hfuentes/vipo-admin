import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from 'src/app/components/error-handler/error-handler.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styleUrls: ['./admision.component.css']
})
export class AdmisionComponent implements OnInit {

  loadSettings: ErrorHandler = {
    loading: false,
    error: undefined
  };
  form = this.formBuilder.group({
    id: [''],
    fechas: [''],
    requisitos: [''],
    becas: [''],
    postula: ['']
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
