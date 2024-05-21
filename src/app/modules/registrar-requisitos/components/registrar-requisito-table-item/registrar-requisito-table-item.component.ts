import { Component, Input } from '@angular/core';
import { Requisito } from '../../interfaces/registrar-requisito.interface';

@Component({
  selector: '[registrar-requisito-table-item]',
  templateUrl: './registrar-requisito-table-item.component.html',
  standalone: true,
  imports: [],
})
export class RegistrarRequisitoTableItemComponent {
  @Input() requisitos = <Requisito>{};
}
