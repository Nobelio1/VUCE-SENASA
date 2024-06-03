import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TupaGeDetalleServiciosService } from '../../services/tupa-ge-detalle-servicios.service';
import { Servicio } from '../../interfaces/tupa-ge-detalle.interface';

@Component({
  selector: 'app-tupa-ge-detalle-ser-modal',
  templateUrl: './tupa-ge-detalle-ser-modal.component.html',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
})
export class TupaGeDetalleSerModalComponent implements OnInit, OnChanges {
  @Input() showModal = false;
  @Input() servicio: string = '';
  @Output() eventModal = new EventEmitter<boolean>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder, private tupaGeDetalleServicioService: TupaGeDetalleServiciosService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      concepto: [''],
      cantidad: [''],
      costo: [''],
    });

    this.form.controls['concepto'].disable();
    this.setFormValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setFormValue();
  }

  private setFormValue() {
    if (this.servicio) {
      this.form.patchValue({
        concepto: this.servicio,
      });
    }
  }

  agregarLista() {
    const servicio: Servicio = {
      concepto: this.form.controls['concepto'].value,
      cantidad: +this.form.controls['cantidad'].value,
      costo: +this.form.controls['costo'].value,
    };

    if (this.form.invalid) {
      console.log('Falta campos por agregar');
      return;
    }

    const listaActual = this.tupaGeDetalleServicioService.obtenerLista();
    listaActual.push(servicio);
    this.tupaGeDetalleServicioService.actualizarServicio(listaActual);
    this.eventModal.emit(false);
  }

  changeModal() {
    this.eventModal.emit(false);
  }
}
