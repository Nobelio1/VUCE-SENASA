import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TupaGeDetalleServiciosService } from '../../services/tupa-ge-detalle-servicios.service';
import {
  ListarServicioOut,
  ListaServicioIn,
  MontoIn,
  MontoOut,
  Servicio,
  ServiciosProc,
} from '../../interfaces/tupa-ge-detalle.interface';

@Component({
  selector: 'app-tupa-ge-detalle-ser-modal',
  templateUrl: './tupa-ge-detalle-ser-modal.component.html',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor],
})
export class TupaGeDetalleSerModalComponent implements OnInit, OnChanges {
  @Input() showModal = false;
  @Input() servicio: ListaServicioIn = {} as ListaServicioIn;
  @Output() eventModal = new EventEmitter<boolean>();

  public servicios: ServiciosProc[] = [];
  public servicioSelected: ServiciosProc = {} as ServiciosProc;

  public form!: FormGroup;

  constructor(private fb: FormBuilder, private tupaGeDetalleServicioService: TupaGeDetalleServiciosService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      concepto: ['', [Validators.required]],
      cantidad: ['1', [Validators.required]],
      costo: ['', [Validators.required]],
    });

    this.form.controls['costo'].disable();
    this.setFormValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setFormValue();
  }

  private setFormValue() {
    if (this.servicio.p_Cod_Servicio !== '' && this.servicio.pproctupa !== '') {
      this.tupaGeDetalleServicioService.listarSerivicioModal(this.servicio).subscribe((data: ListarServicioOut) => {
        if (data.code !== '000') {
          console.log('Algo salio mal al traer los servicio');
          return;
        }

        this.servicios = data.data;
      });
    }
  }

  selectServicio() {
    this.servicioSelected = this.servicios.find((servicio) => {
      return servicio.codigo_Servicio_Tupa === this.form.controls['concepto'].value;
    })!;

    const req: MontoIn = {
      pcodservicio: this.form.controls['concepto'].value,
      pcantidad: this.form.controls['cantidad'].value,
      ptramaproductos: '',
      ptramavacunas: '',
      ptramaanalisis: '',
    };

    this.tupaGeDetalleServicioService.calcularMonto(req).subscribe((data: MontoOut) => {
      if (data.code !== '000') {
        console.log('Se produjo un error al traer el monto');
        return;
      }

      this.form.controls['costo'].setValue(data.data);
    });
  }

  agregarLista() {
    const servicio: Servicio = {
      concepto: this.servicioSelected.descripcion_Servicio,
      cantidad: +this.form.controls['cantidad'].value,
      costo: +this.form.controls['costo'].value,
    };

    if (this.form.invalid) {
      console.log('Falta campos por agregar');
      return;
    }

    if (!Number.isFinite(servicio.costo)) {
      console.log('El valor ingresado no es un numero');
      return;
    }

    const listaActual = this.tupaGeDetalleServicioService.obtenerLista();
    listaActual.push(servicio);

    const nuevaLista: Servicio[] = [];
    nuevaLista.push(servicio);
    this.tupaGeDetalleServicioService.actualizarServicio(nuevaLista);

    this.form.controls['cantidad'].setValue('');
    this.form.controls['costo'].setValue('');

    this.eventModal.emit(false);
  }

  changeModal() {
    this.eventModal.emit(false);
  }
}
