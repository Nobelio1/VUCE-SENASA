import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TupaGeDetalleTableComponent } from '../tupa-ge-detalle-table/tupa-ge-detalle-table.component';
import { TupaGeDetalleService } from '../../services/tupa-ge-detalle.service';
import {
  Area,
  ListarArea,
  ListarProAreaIn,
  ListarProAreaOut,
  ProcedimientoArea,
} from '../../interfaces/tupa-ge-detalle.interface';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tupa-ge-detalle-servicios',
  templateUrl: './tupa-ge-detalle-servicios.component.html',
  standalone: true,
  imports: [TupaGeDetalleTableComponent, NgFor, FormsModule],
})
export class TupaGeDetalleServiciosComponent implements OnInit {
  areas: Area[] = [];
  selectedArea: string = '';

  subAreas: ProcedimientoArea[] = [];

  constructor(private tupaGeDetalleService: TupaGeDetalleService) {}

  ngOnInit(): void {
    this.listarArea();
  }

  onAreaChange(areaValue: string) {
    this.listSubArea(areaValue);
  }

  listarArea() {
    this.tupaGeDetalleService.listArea().subscribe((data: ListarArea) => {
      if (data.code !== '000') {
        throw new Error('Error al conectarse con el servicio');
      }
      this.areas = data.data;
    });
  }

  listSubArea(id: string) {
    let resq: ListarProAreaIn = {
      pareagestion: id,
      indicadorprocedimientognrl: 'S',
    };

    this.tupaGeDetalleService.listProcedimientoPorAreas(resq).subscribe((data: ListarProAreaOut) => {
      if (data.code !== '000') {
        throw new Error('Error en la respuesta');
      }
      this.subAreas = data.data;
    });
  }
}
