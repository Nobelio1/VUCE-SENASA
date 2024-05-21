import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { RegistrarRequisitoBodyComponent } from 'src/app/modules/registrar-requisitos/components/registrar-requisito-body/registrar-requisito-body.component';

@Component({
  selector: 'app-registrar-requisitos',
  templateUrl: './registrar-requisitos.component.html',
  standalone: true,
  imports: [DashboardHeaderComponent, RegistrarRequisitoBodyComponent],
})
export class RegistrarRequisitosComponent {}
