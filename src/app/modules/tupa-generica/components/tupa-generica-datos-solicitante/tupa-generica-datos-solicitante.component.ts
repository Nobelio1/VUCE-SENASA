//EcfcapGi
import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TupaGenericaDtModalComponent } from '../tupa-generica-dt-modal/tupa-generica-dt-modal.component';
import { TupaGenericaService } from '../../services/tupa-generica.service';
import {
  ListarTipoDocumentos,
  Representante,
  RepresentateOut,
  Solicitante2,
  SolicitanteIn,
  SolicitanteOut,
  TipoDocumentos,
} from '../../interfaces/tupa-generica.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TupaGenericaBuscaPersonaModalComponent } from '../tupa-generica-busca-persona-modal/tupa-generica-busca-persona-modal.component';
import { TupaGenericaDatosSoService } from '../../services/tupa-generica-datos-so.service';
import { Subscription } from 'rxjs';
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';

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
    ModalAlertComponent,
  ],
})
export class TupaGenericaDatosSolicitanteComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public form2!: FormGroup;
  public form3!: FormGroup;

  public showModalAgregar = false;
  public showModalBuscar = false;

  //Modal Alert
  public showModalAlert: boolean = false;
  public title: string = '';
  public content: string = '';

  public tipoDocumentos: TipoDocumentos[] = [];
  public personas: Solicitante2[] = [];
  public representantes: Representante[] = [];

  public datosSub!: Subscription;
  public datosActivo: Solicitante2 = {} as Solicitante2;

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
        this.mostrarAlerta(
          'Falta llenar campos',
          'Por favor, complete los campos de Tipo de Documento y Número de Documento',
        );
        return;
      }

      this.showModalBuscar = !this.showModalBuscar;

      const req: SolicitanteIn = {
        ptidodoc: tipoDoc,
        pnumdoc: nroDoc,
      };

      this.tupaGenericaService.listarSoliciante(req).subscribe((data: SolicitanteOut) => {
        if (data.code !== '000') {
          this.mostrarAlerta('Falta llenar campos', 'Se produjo error al traer la data por tipoDocumento');
          return;
        }
        this.personas = data.data;
      });

      this.form3.disable();
    } else {
      if (!nroRazon) {
        this.mostrarAlerta('Falta llenar campos', 'Por favor, complete el campo de Número de Razon Social');
        return;
      }

      const req: SolicitanteIn = {
        pnombre: nroRazon,
      };

      this.tupaGenericaService.listarSoliciante(req).subscribe((data: SolicitanteOut) => {
        if (data.code !== '000') {
          this.mostrarAlerta('Falta llenar campos', 'Se produjo error al traer la data por tipoDocumento');
          return;
        }
        this.personas = data.data;
      });
      this.form3.enable();
    }
  }

  openModal() {
    this.buscarSolicitantePorTipo();
  }

  listDocumentos() {
    this.tupaGenericaService.listTipoDocumento().subscribe((data: ListarTipoDocumentos) => {
      if (data.code !== '000') {
        this.mostrarAlerta('Error', 'Error al traer la data');
        return;
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

  cargarDatos() {
    this.datosSub = this.tupaGenericaDatosSoService.getDatos.subscribe((datos: Solicitante2) => {
      this.datosActivo = datos;
      this.setForm(this.datosActivo);
    });
  }

  setForm(datos: Solicitante2) {
    this.listarRepresentantes(datos.persona_Id);

    this.form2.controls['nroRazon'].setValue(datos.nombre_Razon_Social);
    this.form2.controls['departamento'].setValue(datos.nomb_Dpto_Dpt);
    this.form2.controls['provincia'].setValue(datos.nomb_Prov_Tpr);
    this.form2.controls['distrito'].setValue(datos.nomb_Dist_Tdi);
    this.form2.controls['domicilioLegal'].setValue(datos.direccion);
    this.form2.controls['telefono'].setValue(datos.telefono);
    this.form2.controls['celular'].setValue(datos.telefono_Movil);
    this.form2.controls['fax'].setValue('');
    this.form2.controls['email'].setValue(datos.correo_Electronico);
  }

  selectRepresentante() {
    const id = this.form3.controls['repreLegal'].value;
    this.tupaGenericaDatosSoService.actualizarIdRep(id);
  }

  listarRepresentantes(id: string) {
    this.tupaGenericaService.getRepresentanteLegal(id).subscribe((data: RepresentateOut) => {
      if (data.code !== '000') {
        this.mostrarAlerta('Error', 'Hubo un error al traer a los representantes');
        return;
      }

      this.representantes = data.data;
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

  closeModalBuscar(event: boolean) {
    this.showModalBuscar = event;
  }

  closeModal(event: boolean) {
    this.showModalAgregar = event;
  }
}
