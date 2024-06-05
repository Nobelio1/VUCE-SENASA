import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TupaGenericaDtModalComponent } from '../tupa-generica-dt-modal/tupa-generica-dt-modal.component';
import { TupaGenericaService } from '../../services/tupa-generica.service';
import { ListarTipoDocumentos, Solicitante, TipoDocumentos } from '../../interfaces/tupa-generica.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PersonaSelect,
  TupaGenericaBuscaPersonaModalComponent,
} from '../tupa-generica-busca-persona-modal/tupa-generica-busca-persona-modal.component';
import { TupaGenericaDatosSoService } from '../../services/tupa-generica-datos-so.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tupa-generica-datos-solicitante',
  templateUrl: './tupa-generica-datos-solicitante.component.html',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf,
    TupaGenericaDtModalComponent,
    NgFor,
    ReactiveFormsModule,
    TupaGenericaBuscaPersonaModalComponent,
  ],
})
export class TupaGenericaDatosSolicitanteComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public form2!: FormGroup;
  public form3!: FormGroup;

  public showModalAgregar = false;
  public showModalBuscar = false;
  public tipoDocumentos: TipoDocumentos[] = [];
  public personas: Solicitante[] = [];

  public datosSub!: Subscription;
  public datosActivo: Solicitante = {} as Solicitante;

  constructor(
    private tupaGenericaService: TupaGenericaService,
    private fb: FormBuilder,
    private tupaGenericaDatosSoService: TupaGenericaDatosSoService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      busqueda: ['id1'],
      tipoDocumento: ['', [Validators.required]],
      nroDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nroRazon: ['', [Validators.required]],
    });

    //!------Volver perseverante, el formulario

    this.form2 = this.fb.group({
      nroRazon: [''],
      departamento: [''],
      provincia: [''],
      distrito: [''],
      domicilioLegal: [''],
      telefono: [''],
      celular: [''],
      fax: [''],
      email: [''],
    });

    this.form3 = this.fb.group({
      repreLegal: [''],
    });

    this.form2.disable();
    this.listDocumentos();
    this.changeSearh();

    //reactivo
    this.cargarDatos();
  }

  ngOnDestroy(): void {
    this.datosSub.unsubscribe();
  }

  buscarSolicitantePorTipo() {
    const tipoBusqueda: string = this.form.controls['busqueda'].value;
    const tipoDoc: string = this.form.controls['tipoDocumento'].value;
    const nroDoc: string = this.form.controls['nroDocumento'].value;
    const nroRazon: string = this.form.controls['nroRazon'].value;

    if (tipoBusqueda === 'id1') {
      if (!tipoDoc || !nroDoc) {
        console.log('falta completar data');
        return;
      }
      this.tupaGenericaService.listarSolicitantePorId(nroDoc, tipoDoc).subscribe((data: Solicitante) => {
        this.personas = [];
        this.personas.push(data);
      });
      this.form3.disable();
    } else {
      if (!nroRazon) {
        console.log('falta completar data');
        return;
      }
      this.tupaGenericaService.getSolicitantePorNombre(nroRazon).subscribe((data: Solicitante[]) => {
        //!!----------------------- FALTA PAGINACION
        this.personas = data.slice(1, 15);
      });
      this.form3.enable();
    }
  }

  openModal() {
    this.buscarSolicitantePorTipo();
    this.showModalBuscar = !this.showModalBuscar;
  }

  listDocumentos() {
    this.tupaGenericaService.listTipoDocumento().subscribe((data: ListarTipoDocumentos) => {
      if (data.code !== '000') {
        throw new Error('Error al traer la data');
      }

      this.tipoDocumentos = data.data;
    });
  }

  changeSearh() {
    const search = this.form.controls['busqueda'].value;
    if (search === 'id2') {
      this.form.controls['tipoDocumento'].disable();
      this.form.controls['tipoDocumento'].setValue('');
      this.form.controls['nroDocumento'].disable();
      this.form.controls['nroDocumento'].setValue('');
      this.form.controls['nroRazon'].enable();
    }
    if (search === 'id1') {
      this.form.controls['tipoDocumento'].enable();
      this.form.controls['nroDocumento'].enable();
      this.form.controls['nroRazon'].disable();
      this.form.controls['nroRazon'].setValue('');
    }
  }

  toggleModal() {
    //!---- FALTA LA FUNCIONALIDAD DE AGREGAR
    this.showModalAgregar = !this.showModalAgregar;
  }

  cargarDatos() {
    this.datosSub = this.tupaGenericaDatosSoService.getDatos.subscribe((datos: Solicitante) => {
      this.datosActivo = datos;
      this.setForm(this.datosActivo);
    });
  }

  setForm(datos: Solicitante) {
    let ubigeoArray: string[] = [];

    if (datos.ubigeo) {
      ubigeoArray = datos.ubigeo.name.split(' ');
      ubigeoArray = ubigeoArray.map((item) => item.replace('/', ''));
      ubigeoArray = ubigeoArray.filter((ubi) => ubi !== '');
    }

    this.form2.controls['nroRazon'].setValue(datos.nombreRazonSocial);
    this.form2.controls['departamento'].setValue(ubigeoArray[0]);
    this.form2.controls['provincia'].setValue(ubigeoArray[1]);
    this.form2.controls['distrito'].setValue(ubigeoArray[2]);
    this.form2.controls['domicilioLegal'].setValue(datos.address);
    this.form2.controls['telefono'].setValue(datos.phone);
    this.form2.controls['celular'].setValue(datos.cellphone);
    this.form2.controls['fax'].setValue('');
    this.form2.controls['email'].setValue(datos.email);
  }

  closeModalBuscar(event: boolean) {
    this.showModalBuscar = event;
  }

  closeModal(event: boolean) {
    this.showModalAgregar = event;
  }
}
