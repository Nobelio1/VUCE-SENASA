import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CptPago, Servicio } from '../../interfaces/tupa-ge-detalle.interface';
import { TupaGeDetalleConceptoPagoService } from '../../services/tupa-ge-detalle-concepto-pago.service';

@Component({
  selector: '[tupa-ge-detalle-table-item]',
  templateUrl: './tupa-ge-detalle-table-item.component.html',
  standalone: true,
  imports: [CurrencyPipe, NgIf],
})
export class TupaGeDetalleTableItemComponent implements OnInit {
  @Input() tipo: number = 0;
  @Input() index: number = 0;
  @Input() servicio = <Servicio>{};
  @Input() cptPago = <CptPago>{};

  constructor(private tupaGeDetalleConceptoPagoService: TupaGeDetalleConceptoPagoService) {}

  ngOnInit(): void {}

  listaEliminar(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.tupaGeDetalleConceptoPagoService.agregarElemento(this.index);
    } else {
      this.tupaGeDetalleConceptoPagoService.eliminarElemento(this.index);
    }
  }
}
