import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListaServicioIn, ProcedimientoArea, Servicio } from '../../interfaces/tupa-ge-detalle.interface';
import { NgFor } from '@angular/common';
import { TupaGeDetalleTableItemComponent } from '../tupa-ge-detalle-table-item/tupa-ge-detalle-table-item.component';
import { TupaGeDetalleSerModalComponent } from '../tupa-ge-detalle-ser-modal/tupa-ge-detalle-ser-modal.component';
import { TupaGeDetalleServiciosService } from '../../services/tupa-ge-detalle-servicios.service';
import { Subscription } from 'rxjs';
import { TupaGeDetalleOtroUsuarioService } from '../../services/tupa-ge-detalle-otro-usuario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitante2 } from 'src/app/modules/tupa-generica/interfaces/tupa-generica.interface';
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';

@Component({
  selector: '[tupa-ge-detalle-table]',
  templateUrl: './tupa-ge-detalle-table.component.html',
  standalone: true,
  imports: [
    NgFor,
    TupaGeDetalleTableItemComponent,
    TupaGeDetalleSerModalComponent,
    ReactiveFormsModule,
    ModalAlertComponent,
  ],
})
export class TupaGeDetalleTableComponent implements OnInit, OnChanges {
  @Input() servicio: ListaServicioIn = {} as ListaServicioIn;
  public servicoSelect: ListaServicioIn = {} as ListaServicioIn;

  public form!: FormGroup;

  public showModal: boolean = false;

  //Modal Alert
  public showModalAlert: boolean = false;
  public title: string = '';
  public content: string = '';

  public listaSub!: Subscription;
  public activeServicio: Servicio[] = [];

  constructor(
    private tupaGeDetalleServicioService: TupaGeDetalleServiciosService,
    private tupaGeDetalleOtroUsuarioService: TupaGeDetalleOtroUsuarioService,
    private fb: FormBuilder,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.servicoSelect = changes['servicio'].currentValue;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      otroUsuario: ['1'],
    });

    if (this.tupaGeDetalleOtroUsuarioService.obtenerEstado()) {
      this.form.controls['otroUsuario'].setValue('1');
    } else {
      this.form.controls['otroUsuario'].setValue('0');
    }

    this.cargarLista();
  }

  ngOnDestroy(): void {
    this.listaSub.unsubscribe();
  }

  eliminarServicio() {
    const lista: Servicio[] = [];
    this.tupaGeDetalleServicioService.actualizarServicio(lista);
  }

  habilitarOtroUsuario() {
    if (this.form.controls['otroUsuario'].value === '1') {
      this.tupaGeDetalleOtroUsuarioService.actualizarEstado(false);
      this.tupaGeDetalleOtroUsuarioService.actualizarDatos({} as Solicitante2);
    }
    if (this.form.controls['otroUsuario'].value === '0') {
      this.tupaGeDetalleOtroUsuarioService.actualizarEstado(true);
    }
  }

  cargarLista() {
    this.listaSub = this.tupaGeDetalleServicioService.getLista.subscribe((lista: Servicio[]) => {
      this.activeServicio = lista;
    });
  }

  toggleModal() {
    if (Object.keys(this.servicoSelect).includes('')) {
      this.mostrarAlerta('Error', 'Seleccione un servicio');
      return;
    }

    this.showModal = !this.showModal;
  }

  mostrarAlerta(title: string, content: string) {
    this.showModalAlert = true;
    this.title = title;
    this.content = content;
  }

  closeModalAlert(event: boolean) {
    this.showModalAlert = event;
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }
}
