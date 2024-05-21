import { Component } from '@angular/core';
import { RegistrarRequisitoTableComponent } from '../registrar-requisito-table/registrar-requisito-table.component';

@Component({
  selector: 'app-registrar-requisito-body',
  templateUrl: './registrar-requisito-body.component.html',
  standalone: true,
  imports: [RegistrarRequisitoTableComponent],
})
export class RegistrarRequisitoBodyComponent {}
