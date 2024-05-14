import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../interfaces/tupa-ge-detalle.interface';
import { NgFor } from '@angular/common';
import { TupaGeDetalleTableItemComponent } from '../tupa-ge-detalle-table-item/tupa-ge-detalle-table-item.component';

@Component({
  selector: '[tupa-ge-detalle-table]',
  templateUrl: './tupa-ge-detalle-table.component.html',
  standalone: true,
  imports: [NgFor, TupaGeDetalleTableItemComponent],
})
export class TupaGeDetalleTableComponent implements OnInit {
  public activeServicio: Servicio[] = [];

  constructor() {
    this.activeServicio = [
      {
        id: 1346771,
        concepto: 'Autorizacion sanitaria de fabricante/productor de uso agricola',
        cantidad: 1,
        costo: 491.5,
      },
      {
        id: 3424324,
        concepto: 'Autorizacion solo productor de uso agricola',
        cantidad: 3,
        costo: 1234.5,
      },
    ];
  }

  ngOnInit(): void {}
}
