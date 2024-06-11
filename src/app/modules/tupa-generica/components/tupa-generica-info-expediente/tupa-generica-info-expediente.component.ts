import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InfoExpedienteService } from '../../services/info-expediente.service';
import { Subscription } from 'rxjs';
import { InfoExpendiente } from '../../interfaces/guadar-solicitud.interface';

@Component({
  selector: 'app-tupa-generica-info-expediente',
  templateUrl: './tupa-generica-info-expediente.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class TupaGenericaInfoExpedienteComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  public infoSub!: Subscription;
  public infoActivo: InfoExpendiente = {} as InfoExpendiente;

  constructor(private fb: FormBuilder, private infoExpedienteService: InfoExpedienteService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nroExpediente: [''],
      fechaRegistro: [''],
      oficina: [''],
      area: [''],
      proceso: [''],
      servicioTupa: [''],
      usuario: [''],
      codRecibo: [''],
    });

    this.form.disable();
    this.cargarInfoExp();
  }

  ngOnDestroy(): void {
    this.infoSub.unsubscribe();
  }

  cargarInfoExp() {
    this.infoSub = this.infoExpedienteService.getInfo.subscribe((info) => {
      this.infoActivo = info;
      this.form.patchValue(this.infoActivo);
    });
  }

  descargarRecibo() {
    this.infoExpedienteService.descargarRecibo(this.form.controls['codRecibo'].value).subscribe((data) => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reciboPago.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
