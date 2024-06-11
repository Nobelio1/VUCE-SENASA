import { Component, OnInit } from '@angular/core';
import { RegistrarRequisitoTableComponent } from '../registrar-requisito-table/registrar-requisito-table.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-requisito-body',
  templateUrl: './registrar-requisito-body.component.html',
  standalone: true,
  imports: [RegistrarRequisitoTableComponent, ReactiveFormsModule],
})
export class RegistrarRequisitoBodyComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nroExpediente: [''],
      documento: [''],
    });

    this.form.controls['nroExpediente'].disable();
  }
}
