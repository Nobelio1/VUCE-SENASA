import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  PersonaSelect,
  TupaGenericaBuscaPersonaModalComponent,
} from 'src/app/modules/tupa-generica/components/tupa-generica-busca-persona-modal/tupa-generica-busca-persona-modal.component';
import { TupaGenericaDtModalComponent } from 'src/app/modules/tupa-generica/components/tupa-generica-dt-modal/tupa-generica-dt-modal.component';
import {
  ListarTipoDocumentos,
  Solicitante,
  Solicitante2,
  SolicitanteIn,
  SolicitanteOut,
  TipoDocumentos,
} from 'src/app/modules/tupa-generica/interfaces/tupa-generica.interface';
import { TupaGenericaService } from 'src/app/modules/tupa-generica/services/tupa-generica.service';
import { TupaGeDetalleOtroUsuarioService } from '../../services/tupa-ge-detalle-otro-usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tupa-ge-detalle-otro-usuario',
  templateUrl: './tupa-ge-detalle-otro-usuario.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, TupaGenericaDtModalComponent, TupaGenericaBuscaPersonaModalComponent],
})
export class TupaGeDetalleOtroUsuarioComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public form2!: FormGroup;

  public showModalAgregar = false;
  public showModalBuscar = false;
  public tipoDocumentos: TipoDocumentos[] = [];
  public personas: Solicitante2[] = [];

  public datosSub!: Subscription;
  public datosActivo: Solicitante2 = {} as Solicitante2;

  constructor(
    private tupaGenericaService: TupaGenericaService,
    private fb: FormBuilder,
    private tupaGeDetalleOtroUsuarioService: TupaGeDetalleOtroUsuarioService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      busqueda: ['id1'],
      tipoDoc: [''],
      nroDoc: [''],
      razonSocial: [''],
    });

    this.form2 = this.fb.group({
      razonSocial: [''],
      domicilioLegal: [''],
    });

    this.form2.disable();
    this.listDocumentos();
    this.changeSearh();
    this.cargarDatos();
  }

  ngOnDestroy(): void {
    this.datosSub.unsubscribe();
  }

  listDocumentos() {
    this.tupaGenericaService.listTipoDocumento().subscribe((data: ListarTipoDocumentos) => {
      if (data.code !== '000') {
        throw new Error('Error al traer la data');
      }

      this.tipoDocumentos = data.data;
    });
  }

  buscarSolicitantePorTipo() {
    const tipoBusqueda: string = this.form.controls['busqueda'].value;
    const tipoDoc: string = this.form.controls['tipoDoc'].value;
    const nroDoc: string = this.form.controls['nroDoc'].value;
    const nroRazon: string = this.form.controls['razonSocial'].value;

    if (tipoBusqueda === 'id1') {
      if (!tipoDoc || !nroDoc) {
        console.log('falta completar data');
        return;
      }

      const req: SolicitanteIn = {
        ptidodoc: tipoDoc,
        pnumdoc: nroDoc,
      };

      this.tupaGenericaService.listarSoliciante(req).subscribe((data: SolicitanteOut) => {
        if (data.code !== '000') {
          console.log('Se produjo error al traer la data por tipoDocumento');
          return;
        }
        this.personas = data.data;
      });
    } else {
      if (!nroRazon) {
        console.log('falta completar data');
        return;
      }

      const req: SolicitanteIn = {
        pnombre: nroRazon,
      };

      this.tupaGenericaService.listarSoliciante(req).subscribe((data: SolicitanteOut) => {
        if (data.code !== '000') {
          console.log('Se produjo error al traer la data por tipoDocumento');
          return;
        }
        this.personas = data.data;
      });
    }
  }

  changeSearh() {
    const search = this.form.controls['busqueda'].value;
    if (search === 'id2') {
      this.form.controls['tipoDoc'].disable();
      this.form.controls['tipoDoc'].setValue('');
      this.form.controls['nroDoc'].disable();
      this.form.controls['nroDoc'].setValue('');
      this.form.controls['razonSocial'].enable();
    }
    if (search === 'id1') {
      this.form.controls['tipoDoc'].enable();
      this.form.controls['nroDoc'].enable();
      this.form.controls['razonSocial'].disable();
      this.form.controls['razonSocial'].setValue('');
    }
  }

  openModal() {
    this.buscarSolicitantePorTipo();
    this.showModalBuscar = !this.showModalBuscar;
  }

  toggleModalAgregar() {
    //!---- FALTA LA FUNCIONALIDAD DE AGREGAR
    this.showModalAgregar = !this.showModalAgregar;
  }

  cargarDatos() {
    this.datosSub = this.tupaGeDetalleOtroUsuarioService.getDatos.subscribe((datos: Solicitante2) => {
      this.datosActivo = datos;
      this.setForm(this.datosActivo);
    });
  }

  setForm(datos: Solicitante2) {
    this.form2.controls['domicilioLegal'].setValue(datos.direccion);
    this.form2.controls['razonSocial'].setValue(datos.nombre_Razon_Social);
  }

  setDataBuscar(event: boolean) {
    this.showModalBuscar = event;
  }

  setDataAgregar(event: boolean) {
    this.showModalAgregar = event;
  }
}
