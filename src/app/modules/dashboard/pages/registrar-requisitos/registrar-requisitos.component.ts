import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { RegistrarRequisitoBodyComponent } from 'src/app/modules/registrar-requisitos/components/registrar-requisito-body/registrar-requisito-body.component';
import { RrDashboardHeaderComponent } from 'src/app/modules/registrar-requisitos/components/rr-dashboard-header/rr-dashboard-header.component';

@Component({
  selector: 'app-registrar-requisitos',
  templateUrl: './registrar-requisitos.component.html',
  standalone: true,
  imports: [DashboardHeaderComponent, RegistrarRequisitoBodyComponent, RrDashboardHeaderComponent],
})
export class RegistrarRequisitosComponent {}
