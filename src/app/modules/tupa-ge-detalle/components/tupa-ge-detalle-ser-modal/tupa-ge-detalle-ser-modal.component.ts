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
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-tupa-ge-detalle-ser-modal',
  templateUrl: './tupa-ge-detalle-ser-modal.component.html',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, ModalAlertComponent],
})
export class TupaGeDetalleSerModalComponent implements OnInit, OnChanges {
  public form!: FormGroup;

  @Input() showModal = false;
  @Output() eventModal = new EventEmitter<boolean>();

  @Input() servicio: ListaServicioIn = {} as ListaServicioIn;

  public showModalAlert: boolean = false;
  public title: string = '';
  public content: string = '';

  public numExp: boolean = false;
  public servicios: ServiciosProc[] = [];
  public servicioSelected: ServiciosProc = {} as ServiciosProc;

  constructor(private fb: FormBuilder, private tupaGeDetalleServicioService: TupaGeDetalleServiciosService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      concepto: ['', [Validators.required]],
      expediente: [''],
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
          this.mostrarAlerta('Error', 'Algo salio mal al traer los servicio');
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

    this.tupaGeDetalleServicioService.servicio.serivico = this.servicioSelected.descripcion_Servicio;

    this.esRenovacion(this.servicioSelected);

    const req: MontoIn = {
      pcodservicio: this.form.controls['concepto'].value,
      pcantidad: this.form.controls['cantidad'].value,
      ptramaproductos: '',
      ptramavacunas: '',
      ptramaanalisis: '',
    };

    this.tupaGeDetalleServicioService.calcularMonto(req).subscribe((data: MontoOut) => {
      if (data.code !== '000') {
        this.mostrarAlerta('Error', 'Algo salio mal al traer el monto');
        return;
      }

      this.form.controls['costo'].setValue(data.data);
    });
  }

  esRenovacion(servicio: ServiciosProc) {
    const renovacion = servicio.descripcion_Servicio.split(' ')[0];

    if (renovacion === 'RENOVACION') {
      this.numExp = true;
    } else {
      this.numExp = false;
    }
  }

  agregarLista() {
    const servicio: Servicio = {
      concepto: this.servicioSelected.descripcion_Servicio,
      cantidad: +this.form.controls['cantidad'].value,
      costo: +this.form.controls['costo'].value,
    };

    if (this.numExp) {
      servicio.pcodexpediente = this.form.controls['expediente'].value;
    }

    if (this.form.invalid) {
      this.mostrarAlerta('Falta llenar campos', 'Por favor, complete los campos');
      return;
    }

    if (!Number.isFinite(servicio.costo)) {
      this.mostrarAlerta('Error', 'El valor ingresado no es un numero');
      return;
    }

    const listaActual = this.tupaGeDetalleServicioService.obtenerLista();
    listaActual.push(servicio);

    // const nuevaLista: Servicio[] = [];
    // nuevaLista.push(servicio);
    this.tupaGeDetalleServicioService.actualizarServicio(listaActual);

    this.form.controls['cantidad'].setValue('');
    this.form.controls['costo'].setValue('');

    this.eventModal.emit(false);
  }

  mostrarAlerta(title: string, content: string) {
    this.showModalAlert = true;
    this.title = title;
    this.content = content;
  }

  closeModalAlert(event: boolean) {
    this.showModalAlert = event;
  }

  changeModal() {
    this.eventModal.emit(false);
  }
}
