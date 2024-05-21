import { Component } from '@angular/core';
import { RegistrarRequisitoTableItemComponent } from '../registrar-requisito-table-item/registrar-requisito-table-item.component';
import { NgFor } from '@angular/common';
import { Requisito } from '../../interfaces/registrar-requisito.interface';

@Component({
  selector: '[registrar-requisito-table]',
  templateUrl: './registrar-requisito-table.component.html',
  standalone: true,
  imports: [RegistrarRequisitoTableItemComponent, NgFor],
})
export class RegistrarRequisitoTableComponent {
  public activeRequisito: Requisito[] = [];

  constructor() {
    this.activeRequisito = [
      {
        id: 1,
        obligatorio: 'Si',
        requisito:
          'Solicitud dirigida al Director de Logistica en la Sede Central o al Director Ejecutivo de la jurisdiccion',
      },
      {
        id: 2,
        obligatorio: 'Si',
        requisito: 'Boleta de pago o validacion de pago en el sistema',
      },
    ];
  }
}
