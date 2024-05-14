import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TupaGenericaTabHeaderComponent } from '../tupa-generica-tab-header/tupa-generica-tab-header.component';
import { TupaGenericaDatosSolicitanteComponent } from '../tupa-generica-datos-solicitante/tupa-generica-datos-solicitante.component';
import { TupaGenericaDetalleComponent } from '../tupa-generica-detalle/tupa-generica-detalle.component';
import { TupaGenericaIdEnum, TupaGenericaInterface } from '../../interfaces/tupa-generica.interface';
import { TupaGenericaInfoExpedienteComponent } from '../tupa-generica-info-expediente/tupa-generica-info-expediente.component';

@Component({
  selector: 'app-tupa-generica-tab-container',
  templateUrl: './tupa-generica-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TupaGenericaTabHeaderComponent,
    TupaGenericaDatosSolicitanteComponent,
    TupaGenericaDetalleComponent,
    TupaGenericaInfoExpedienteComponent,
  ],
})
export class TupaGenericaTabContainerComponent {
  tabs: TupaGenericaInterface[] = [
    {
      id: TupaGenericaIdEnum.DATOS_SOLICITANTE,
      name: 'Datos Solicitante',
      active: true,
    },
    {
      id: TupaGenericaIdEnum.DETALLE,
      name: 'Detalle',
      active: false,
    },
    {
      id: TupaGenericaIdEnum.INFO_EXPEDIENTE,
      name: 'Información del expediente',
      active: false,
    },
  ];

  onSelect(item: TupaGenericaInterface) {
    this.tabs = this.tabs.map((tab) => {
      tab.active = item.id === tab.id;
      return tab;
    });
  }

  get currentTab(): TupaGenericaInterface | undefined {
    return this.tabs.find((item) => item.active);
  }

  get currentTabKey(): TupaGenericaIdEnum {
    const tab = this.tabs.find((item) => item.active);
    return tab?.id || TupaGenericaIdEnum.DATOS_SOLICITANTE;
  }
}
