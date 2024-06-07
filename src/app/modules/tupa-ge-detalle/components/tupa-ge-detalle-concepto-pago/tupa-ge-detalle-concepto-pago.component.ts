import { TupaGeDetalleConceptoPagoService } from './../../services/tupa-ge-detalle-concepto-pago.service';
import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TupaGeDetalleTableItemComponent } from '../tupa-ge-detalle-table-item/tupa-ge-detalle-table-item.component';
import { CptPago, Servicio } from '../../interfaces/tupa-ge-detalle.interface';
import { TupaGeDetalleCpModalComponent } from '../tupa-ge-detalle-cp-modal/tupa-ge-detalle-cp-modal.component';
import { Subscription } from 'rxjs';
import { TupaGeDetalleServiciosService } from '../../services/tupa-ge-detalle-servicios.service';

@Component({
  selector: 'app-tupa-ge-detalle-concepto-pago',
  templateUrl: './tupa-ge-detalle-concepto-pago.component.html',
  standalone: true,
  imports: [NgFor, TupaGeDetalleTableItemComponent, TupaGeDetalleCpModalComponent],
})
export class TupaGeDetalleConceptoPagoComponent implements OnInit, OnDestroy {
  public conceptoPago: CptPago[] = [];
  public montos: number[] = [];
  public montoTotal: number = 0;
  public showModal = false;
  public monto: Servicio[] = [];

  public listaSub!: Subscription;

  constructor(
    private tupaGeDetalleConceptoPagoService: TupaGeDetalleConceptoPagoService,
    private tupaGeDetalleServiciosService: TupaGeDetalleServiciosService,
  ) {}

  ngOnInit(): void {
    this.listaSub = this.tupaGeDetalleConceptoPagoService.getLista.subscribe((lista: CptPago[]) => {
      this.conceptoPago = lista;
      this.sumaMontos();
    });
  }

  eliminarElementos() {
    this.tupaGeDetalleConceptoPagoService.eliminarPagos();
  }

  ngOnDestroy(): void {
    this.listaSub.unsubscribe();
  }

  sumaMontos() {
    this.montos = [];
    this.monto = this.tupaGeDetalleServiciosService.obtenerLista();

    this.monto.forEach((element) => {
      this.montos.push(element.costo);
    });

    this.montoTotal = this.montos.reduce((a, b) => a + b, 0);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }
}
