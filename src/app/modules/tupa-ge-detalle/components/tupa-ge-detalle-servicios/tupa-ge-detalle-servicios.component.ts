import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TupaGeDetalleTableComponent } from '../tupa-ge-detalle-table/tupa-ge-detalle-table.component';
import { TupaGeDetalleService } from '../../services/tupa-ge-detalle.service';
import {
  Area,
  ListarArea,
  ListarProAreaIn,
  ListarProAreaOut,
  ListaServicioIn,
  ProcedimientoArea,
} from '../../interfaces/tupa-ge-detalle.interface';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TupaGeDetalleServiciosService } from '../../services/tupa-ge-detalle-servicios.service';
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-tupa-ge-detalle-servicios',
  templateUrl: './tupa-ge-detalle-servicios.component.html',
  standalone: true,
  imports: [TupaGeDetalleTableComponent, NgFor, FormsModule, ReactiveFormsModule, ModalAlertComponent],
})
export class TupaGeDetalleServiciosComponent implements OnInit {
  //Modal Alert
  public showModalAlert: boolean = false;
  public title: string = '';
  public content: string = '';

  public areas: Area[] = [];
  public selectedArea: string = '';

  public servicio: ProcedimientoArea = {} as ProcedimientoArea;
  public grupoServicio: ListaServicioIn = {} as ListaServicioIn;

  public form!: FormGroup;

  public subAreas: ProcedimientoArea[] = [];

  constructor(
    private tupaGeDetalleService: TupaGeDetalleService,
    private fb: FormBuilder,
    private tupaGeDetalleServiciosService: TupaGeDetalleServiciosService,
  ) {}

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
    const areaSelect: Area = this.areas.find((area) => area.codigo_Area_Gestion === this.form.controls['area'].value)!;

    this.tupaGeDetalleServiciosService.servicio.area = areaSelect.descripcion_Area_Gestion;
  }

  listarArea() {
    this.tupaGeDetalleService.listArea().subscribe((data: ListarArea) => {
      if (data.code !== '000') {
        this.mostrarAlerta('Error', 'Error al conectarse con el servicio');
        return;
      }
      this.areas = data.data;
    });
  }

  selectedService() {
    this.grupoServicio.p_Cod_Servicio = this.form.controls['area'].value;
    this.grupoServicio.pproctupa = this.form.controls['procedimiento'].value;

    this.tupaGeDetalleServiciosService.actualizarIdProcedimiento(this.form.controls['procedimiento'].value);

    this.servicio = this.subAreas.find(
      (area) => area.codigo_Procedimiento_Tupa === this.form.controls['procedimiento'].value,
    )!;

    this.tupaGeDetalleServiciosService.servicio.proceso = this.servicio.descripcion_Procedimieto_Tupa;
  }

  listSubArea(id: string) {
    let resq: ListarProAreaIn = {
      pareagestion: id,
      indicadorprocedimientognrl: 'S',
    };

    this.tupaGeDetalleService.listProcedimientoPorAreas(resq).subscribe((data: ListarProAreaOut) => {
      if (data.code !== '000') {
        this.mostrarAlerta('Error', 'Error al traer el procedimiento');
        return;
      }
      this.subAreas = data.data;
    });
  }

  mostrarAlerta(title: string, content: string) {
    this.showModalAlert = true;
    this.title = title;
    this.content = content;
  }

  closeModalAlert(event: boolean) {
    this.showModalAlert = event;
  }
}
