import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Servicio } from '../../interfaces/tupa-ge-detalle.interface';

@Component({
  selector: '[tupa-ge-detalle-table-item]',
  templateUrl: './tupa-ge-detalle-table-item.component.html',
  standalone: true,
  imports: [CurrencyPipe],
})
export class TupaGeDetalleTableItemComponent implements OnInit {
  @Input() servicio = <Servicio>{};

  constructor() {}

  ngOnInit(): void {}
}
