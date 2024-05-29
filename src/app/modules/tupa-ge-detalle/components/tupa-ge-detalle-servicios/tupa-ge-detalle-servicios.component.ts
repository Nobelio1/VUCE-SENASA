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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tupa-ge-detalle-servicios',
  templateUrl: './tupa-ge-detalle-servicios.component.html',
  standalone: true,
  imports: [TupaGeDetalleTableComponent, NgFor, FormsModule, ReactiveFormsModule],
})
export class TupaGeDetalleServiciosComponent implements OnInit {
  public areas: Area[] = [];
  public selectedArea: string = '';

  public servicio: ProcedimientoArea = {} as ProcedimientoArea;

  public form!: FormGroup;

  public subAreas: ProcedimientoArea[] = [];

  constructor(private tupaGeDetalleService: TupaGeDetalleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      oficina: ['SENASA-CENTRAL'],
      area: [''],
      procedimiento: [''],
    });

    this.form.controls['oficina'].disable();

    this.listarArea();
  }

  onAreaChange() {
    this.listSubArea(this.form.controls['area'].value);
  }

  listarArea() {
    this.tupaGeDetalleService.listArea().subscribe((data: ListarArea) => {
      if (data.code !== '000') {
        throw new Error('Error al conectarse con el servicio');
      }
      this.areas = data.data;
    });
  }

  selectedService() {
    this.servicio = this.subAreas.find(
      (area) => area.codigo_Procedimiento_Tupa === this.form.controls['procedimiento'].value,
    )!;
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
