import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CptPago, Servicio } from '../../interfaces/tupa-ge-detalle.interface';

@Component({
  selector: '[tupa-ge-detalle-table-item]',
  templateUrl: './tupa-ge-detalle-table-item.component.html',
  standalone: true,
  imports: [CurrencyPipe, NgIf],
})
export class TupaGeDetalleTableItemComponent implements OnInit {
  @Input() tipo: number = 0;
  @Input() servicio = <Servicio>{};
  @Input() cptPago = <CptPago>{};

  constructor() {}

  ngOnInit(): void {}
}
