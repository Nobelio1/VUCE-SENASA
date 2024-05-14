import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TupaGeDetalleTabHeaderComponent } from '../tupa-ge-detalle-tab-header/tupa-ge-detalle-tab-header.component';
import { TupaGeDetalleConceptoPagoComponent } from '../tupa-ge-detalle-concepto-pago/tupa-ge-detalle-concepto-pago.component';
import { TupaGeDetalleServiciosComponent } from '../tupa-ge-detalle-servicios/tupa-ge-detalle-servicios.component';
import { TupaGeDetalleTipoAdicionalComponent } from '../tupa-ge-detalle-tipo-adicional/tupa-ge-detalle-tipo-adicional.component';
import { TupaGeDetalleOtroUsuarioComponent } from '../tupa-ge-detalle-otro-usuario/tupa-ge-detalle-otro-usuario.component';
import { TupaGeDetalleIdEnum, TupaGeDetalleInterface } from '../../interfaces/tupa-ge-detalle.interface';

@Component({
  selector: 'app-tupa-ge-detalle-tab-container',
  templateUrl: './tupa-ge-detalle-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TupaGeDetalleTabHeaderComponent,
    TupaGeDetalleServiciosComponent,
    TupaGeDetalleTipoAdicionalComponent,
    TupaGeDetalleOtroUsuarioComponent,
    TupaGeDetalleConceptoPagoComponent,
  ],
})
export class TupaGeDetalleTabContainerComponent {
  tabs: TupaGeDetalleInterface[] = [
    {
      id: TupaGeDetalleIdEnum.SERVICIOS,
      name: 'Servicios',
      active: true,
    },
    {
      id: TupaGeDetalleIdEnum.TIPO_ADICIONAL,
      name: 'Tipo Adicional',
      active: false,
    },
    {
      id: TupaGeDetalleIdEnum.OTRO_USUARIO,
      name: 'Otro Usuario',
      active: false,
    },
    {
      id: TupaGeDetalleIdEnum.CPT_PAGO,
      name: 'Concepto de pago',
      active: false,
    },
  ];

  onSelect(item: TupaGeDetalleInterface) {
    this.tabs = this.tabs.map((tab) => {
      tab.active = item.id === tab.id;
      return tab;
    });
  }

  get currentTab(): TupaGeDetalleInterface | undefined {
    return this.tabs.find((item) => item.active);
  }

  get currentTabKey(): TupaGeDetalleIdEnum {
    const tab = this.tabs.find((item) => item.active);
    return tab?.id || TupaGeDetalleIdEnum.SERVICIOS;
  }
}
