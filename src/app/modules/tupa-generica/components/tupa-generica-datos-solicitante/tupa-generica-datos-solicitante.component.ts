import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TupaGenericaDtModalComponent } from '../tupa-generica-dt-modal/tupa-generica-dt-modal.component';
import { TupaGenericaService } from '../../services/tupa-generica.service';
import { ListarTipoDocumentos, Solicitante, TipoDocumentos } from '../../interfaces/tupa-generica.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PersonaSelect,
  TupaGenericaBuscaPersonaModalComponent,
} from '../tupa-generica-busca-persona-modal/tupa-generica-busca-persona-modal.component';

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
export class TupaGenericaDatosSolicitanteComponent implements OnInit {
  public form!: FormGroup;
  public form2!: FormGroup;
  public form3!: FormGroup;

  public showModalAgregar = false;
  public showModalBuscar = false;
  public tipoDocumentos: TipoDocumentos[] = [];
  public personas: Solicitante[] = [];
  public personas2: Solicitante[] = [];

  constructor(private tupaGenericaService: TupaGenericaService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      busqueda: ['id1'],
      tipoDocumento: ['', [Validators.required]],
      nroDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nroRazon: ['', [Validators.required]],
    });

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
        this.personas = [...this.personas, data];
      });
      this.form3.disable();
    } else {
      if (!nroRazon) {
        console.log('falta completar data');
        return;
      }
      this.tupaGenericaService.getSolicitantePorNombre(nroRazon).subscribe((data: Solicitante[]) => {
        //!! FALTA PAGINACION -----------------------
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
    this.showModalAgregar = !this.showModalAgregar;
  }

  closeModalBuscar(event: PersonaSelect) {
    let ubigeoArray: string[] = [];

    if (event.data.ubigeo) {
      ubigeoArray = event.data.ubigeo.name.split(' ');
      ubigeoArray = ubigeoArray.map((item) => item.replace('/', ''));
      ubigeoArray = ubigeoArray.filter((ubi) => ubi !== '');
    }

    this.form2.controls['nroRazon'].setValue(event.data.nombreRazonSocial);
    this.form2.controls['departamento'].setValue(ubigeoArray[0]);
    this.form2.controls['provincia'].setValue(ubigeoArray[1]);
    this.form2.controls['distrito'].setValue(ubigeoArray[2]);
    this.form2.controls['domicilioLegal'].setValue(event.data.address);
    this.form2.controls['telefono'].setValue(event.data.phone);
    this.form2.controls['celular'].setValue(event.data.cellphone);
    this.form2.controls['fax'].setValue('');
    this.form2.controls['email'].setValue(event.data.email);
    this.showModalBuscar = event.modal;
  }

  closeModal(event: boolean) {
    this.showModalAgregar = event;
  }
}
