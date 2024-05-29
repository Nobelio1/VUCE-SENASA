import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tupa-generica-info-expediente',
  templateUrl: './tupa-generica-info-expediente.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class TupaGenericaInfoExpedienteComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nroExpediente: [''],
      fechaRegistro: [''],
      oficina: [''],
      area: [''],
      proceso: [''],
      servicioTupa: [''],
      usuario: [''],
    });

    this.form.disable();
  }
}
