import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DrTabHeaderComponent } from '../dr-tab-header/dr-tab-header.component';
import { DrInfoExpendienteComponent } from '../dr-info-expendiente/dr-info-expendiente.component';
import { DrObservacionesComponent } from '../dr-observaciones/dr-observaciones.component';
import { DrDevDocResolutivosComponent } from '../dr-dev-doc-resolutivos/dr-dev-doc-resolutivos.component';
import { DrTrazabilidadComponent } from '../dr-trazabilidad/dr-trazabilidad.component';
import {
  DocumentoResolutivoIdEnum,
  DocumentoResolutivoInterface,
} from '../../interfaces/documento-resolutivo.interface';

@Component({
  selector: 'app-dr-tab-container',
  templateUrl: './dr-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DrTabHeaderComponent,
    DrInfoExpendienteComponent,
    DrObservacionesComponent,
    DrDevDocResolutivosComponent,
    DrTrazabilidadComponent,
  ],
})
export class DrTabContainerComponent {
  tabs: DocumentoResolutivoInterface[] = [
    {
      id: DocumentoResolutivoIdEnum.INFORMACION_DEL_EXPEDIENTE,
      name: 'Información del expediente',
      active: false,
    },
    {
      id: DocumentoResolutivoIdEnum.OBSERVACIONES,
      name: 'Observaciones',
      active: false,
    },
    {
      id: DocumentoResolutivoIdEnum.DERIVACION_DOCUMENTOS_RESOLUTIVOS,
      name: 'Derivación documentos resolutivos',
      active: false,
    },
    {
      id: DocumentoResolutivoIdEnum.TRAZABILIDAD,
      name: 'Trazabilidad',
      active: false,
    },
  ];

  onSelect(item: DocumentoResolutivoInterface) {
    this.tabs = this.tabs.map((tab) => {
      tab.active = item.id === tab.id;
      return tab;
    });
  }

  get currentTab(): DocumentoResolutivoInterface | undefined {
    return this.tabs.find((item) => item.active);
  }

  get currentTabKey(): DocumentoResolutivoIdEnum {
    const tab = this.tabs.find((item) => item.active);
    return tab?.id || DocumentoResolutivoIdEnum.INFORMACION_DEL_EXPEDIENTE;
  }
}
