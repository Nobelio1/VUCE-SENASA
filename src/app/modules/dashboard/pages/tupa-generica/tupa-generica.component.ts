import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { TupaGenericaTabContainerComponent } from '../../../tupa-generica/components/tupa-generica-tab-container/tupa-generica-tab-container.component';

@Component({
  selector: 'app-tupa-generica',
  templateUrl: './tupa-generica.component.html',
  standalone: true,
  imports: [DashboardHeaderComponent, TupaGenericaTabContainerComponent],
})
export class TupaGenericaComponent {}
