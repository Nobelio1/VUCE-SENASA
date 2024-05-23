import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TupaGeDetalleTableItemComponent } from '../tupa-ge-detalle-table-item/tupa-ge-detalle-table-item.component';
import { CptPago } from '../../interfaces/tupa-ge-detalle.interface';
import { TupaGeDetalleCpModalComponent } from '../tupa-ge-detalle-cp-modal/tupa-ge-detalle-cp-modal.component';

@Component({
  selector: 'app-tupa-ge-detalle-concepto-pago',
  templateUrl: './tupa-ge-detalle-concepto-pago.component.html',
  standalone: true,
  imports: [NgFor, TupaGeDetalleTableItemComponent, TupaGeDetalleCpModalComponent],
})
export class TupaGeDetalleConceptoPagoComponent implements OnInit {
  public conceptoPago: CptPago[] = [];
  public montos: number[] = [];
  public montoTotal: number = 0;

  public showModal = false;

  constructor() {
    this.conceptoPago = [
      {
        id: 1231312,
        tipoPago: 'EFECTIVO',
        banco: 'BANCO DE LA NACION / 00000-22231',
        nroOperacion: '123519234813',
        fecha: '08/05/2024',
        monto: 123.21,
      },
      {
        id: 3513123,
        tipoPago: 'EFECTIVO',
        banco: 'BANCO DE LA NACION / 00000-2241322',
        nroOperacion: '42112312331223',
        fecha: '01/01/2024',
        monto: 543.21,
      },
      {
        id: 8563524,
        tipoPago: 'DEPOSITO',
        banco: 'INTERBANK / 00000-1112313',
        nroOperacion: '6442341412312',
        fecha: '02/04/2024',
        monto: 452.1,
      },
      {
        id: 6546354,
        tipoPago: 'DEPOSITO',
        banco: 'BBVA / 02000-123123',
        nroOperacion: '231251234543',
        fecha: '15/03/2024',
        monto: 23.21,
      },
    ];
  }

  ngOnInit(): void {
    this.sumaMontos();
  }

  sumaMontos() {
    this.conceptoPago.forEach((concepto) => {
      this.montos.push(concepto.monto);
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
