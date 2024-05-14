import { Component } from '@angular/core';
import { TupaGeDetalleTabContainerComponent } from 'src/app/modules/tupa-ge-detalle/components/tupa-ge-detalle-tab-container/tupa-ge-detalle-tab-container.component';

@Component({
  selector: 'app-tupa-generica-detalle',
  templateUrl: './tupa-generica-detalle.component.html',
  standalone: true,
  imports: [TupaGeDetalleTabContainerComponent],
})
export class TupaGenericaDetalleComponent {}
