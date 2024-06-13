import { Component } from '@angular/core';
import { DrDashboardHeaderComponent } from 'src/app/modules/documento-resolutivo/components/dr-dashboard-header/dr-dashboard-header.component';
import { DrTabContainerComponent } from '../../../documento-resolutivo/components/dr-tab-container/dr-tab-container.component';

@Component({
  selector: 'app-documento-resolutivo',
  templateUrl: './documento-resolutivo.component.html',
  standalone: true,
  imports: [DrDashboardHeaderComponent, DrTabContainerComponent],
})
export class DocumentoResolutivoComponent {}
