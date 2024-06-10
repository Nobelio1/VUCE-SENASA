import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AgregarUsuarioIn,
  AgregarUsuarioOut,
  ListarTipoDocumentos,
  RegistroUsuario,
  Solicitante2,
  TipoDocumentos,
  Ubigeo,
} from '../../interfaces/tupa-generica.interface';
import { TupaGenericaService } from '../../services/tupa-generica.service';
import { TupaGenericaDatosSoService } from '../../services/tupa-generica-datos-so.service';
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-tupa-generica-dt-modal',
  templateUrl: './tupa-generica-dt-modal.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, ModalAlertComponent],
})
export class TupaGenericaDtModalComponent implements OnInit {
  @Input() showModal = false;
  @Output() eventModal = new EventEmitter<boolean>();

  public showModalAlert: boolean = false;
  public title: string = '';
  public content: string = '';

  public form!: FormGroup;

  public tipoDocumentos: TipoDocumentos[] = [];

  public departamentos: Ubigeo[] = [];
  public provincias: Ubigeo[] = [];
  public distritos: Ubigeo[] = [];

  public selectedDep: string = '';
  public selectedPro: string = '';
  public selectedDis: string = '';

  public usuario: RegistroUsuario = {} as RegistroUsuario;

  constructor(
    private tupaGenericaService: TupaGenericaService,
    private tupaGenericaDatosSoService: TupaGenericaDatosSoService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nroRuc: [''],
      nroDni: [''],
      tipoPersona: [''],
      tipoDocumento: [''],
      nroId: [''],
      ruc: [''],
      razonSocial: [''],
      nombre: [''],
      apePaterno: [''],
      apeMaterno: [''],
      departamento: [''],
      provincia: [''],
      distrito: [''],
      poblado: [''],
      direccion: [''],
      referencia: [''],
      nroCelular: [''],
      nroTelefono: [''],
      email: [''],
      estadoNatural: [''],
      estadoJuridico: [''],
    });

    this.listDocumentos();
    this.listarDep();
  }

  listDocumentos() {
    this.tupaGenericaService.listTipoDocumento().subscribe((data: ListarTipoDocumentos) => {
      if (data.code !== '000') {
        this.showModalAlert = true;
        this.title = 'Error';
        this.content = 'Error al traer los tipo de documentos';
        return;
      }

      this.tipoDocumentos = data.data;
    });
  }

  cambioUbigeo(tipo: string) {
    //Optimizar flujo

    const codDep: string = this.form.controls['departamento'].value;
    const codPro: string = this.form.controls['provincia'].value;
    const codDis: string = this.form.controls['distrito'].value;

    switch (tipo) {
      case 'DEP':
        this.listarProv(codDep);
        break;
      case 'PROV':
        this.listarDis(codDep, codPro);
    }
  }

  listarDep() {
    this.tupaGenericaDatosSoService.listaDep().subscribe((data: Ubigeo[]) => {
      this.departamentos = data;
    });
  }

  listarProv(dep: string) {
    this.tupaGenericaDatosSoService.listaPro(dep).subscribe((data: Ubigeo[]) => {
      this.provincias = data;
    });
  }

  listarDis(dep: string, prov: string) {
    this.tupaGenericaDatosSoService.listaDis(dep, prov).subscribe((data: Ubigeo[]) => {
      this.distritos = data;
    });
  }

  buscarSunat() {
    const ruc: string = this.form.controls['nroRuc'].value;

    if (ruc === '') {
      this.showModalAlert = true;
      this.title = 'Falta llenar campos';
      this.content = 'El numero ruc esta vacio o no es valido';
      return;
    }

    this.tupaGenericaService.getRegistrosSunat(ruc).subscribe((data: RegistroUsuario) => {
      this.setForm(data, '04');
      this.usuario = data;
    });
  }

  buscarReniec() {
    const dni: string = this.form.controls['nroDni'].value;

    if (dni === '') {
      this.showModalAlert = true;
      this.title = 'Falta llenar campos';
      this.content = 'El numero deldocumento esta vacio o no es valido';
      return;
    }

    this.tupaGenericaService.getRegistroReniec(dni).subscribe((data: RegistroUsuario) => {
      this.setForm(data, '01');
      this.usuario = data;
    });
  }

  setForm(data: RegistroUsuario, tipo: string) {
    this.listarProv(data.departamentoId);
    this.listarDis(data.departamentoId, data.provinciaId);

    this.form.controls['tipoPersona'].setValue(tipo == '01' ? '00' : '01');
    this.form.controls['tipoDocumento'].setValue(tipo);
    this.form.controls['nroId'].setValue(data.documentoNumero || '');
    this.form.controls['ruc'].setValue(data.ruc || '');
    this.form.controls['razonSocial'].setValue(data.nombreRazonSocial || '');
    this.form.controls['nombre'].setValue(data.nombres || '');
    this.form.controls['apePaterno'].setValue(data.apellidoPaterno || '');
    this.form.controls['apeMaterno'].setValue(data.apellidoMaterno || '');
    this.form.controls['departamento'].setValue(data.departamentoId || '');
    this.form.controls['provincia'].setValue(data.provinciaId || '');
    this.form.controls['distrito'].setValue(data.distritoId || '');
    this.form.controls['poblado'].setValue(data.referenciaDireccion || '');
    this.form.controls['direccion'].setValue(data.direccion || '');
    this.form.controls['referencia'].setValue(data.referenciaDireccion || '');
    this.form.controls['nroCelular'].setValue(data.telefonoMovil || '');
    this.form.controls['nroTelefono'].setValue(data.telefono || '');
    this.form.controls['email'].setValue(data.correoElectronico || '');
    this.form.controls['estadoNatural'].setValue(data.estadoNatural === 'ACTIVO' ? '01' : '00' || '');
    this.form.controls['estadoJuridico'].setValue(data.estadoNatural === 'ACTIVO' ? '01' : '00' || '');
  }

  agregarUsuario() {
    const nombre: string = this.form.controls['nombre'].value;
    const apePaterno: string = this.form.controls['apePaterno'].value;
    const apeMaterno: string = this.form.controls['apeMaterno'].value;

    if (nombre === '' || apePaterno === '' || apeMaterno === '') {
      this.showModalAlert = true;
      this.title = 'Falta llenar campos';
      this.content = 'El nombre o apellidos no pueden estar vacios';
      return;
    }

    const req: AgregarUsuarioIn = {
      p_Persona_Id: this.usuario.id,
      p_Nombre_Razon_Social: this.usuario.nombreRazonSocial,
      p_Persona_Tipo: this.form.controls['tipoPersona'].value,
      p_Documento_Tipo: this.form.controls['tipoDocumento'].value,
      p_Documento_Numero: this.usuario.documentoNumero,
      p_Ruc: this.usuario.ruc,
      p_Direccion: this.usuario.direccion,
      p_Departamento_Id: this.usuario.departamentoId,
      p_Provincia_Id: this.usuario.provinciaId,
      p_Distrito_Id: this.usuario.distritoId,
      p_Telefono: this.usuario.telefono,
      p_Telefono_Movil: this.usuario.telefonoMovil,
      p_Correo_Electronico: this.usuario.correoElectronico,
      p_Fecha_Nacimiento: '',
      p_Referencia_Direccion: this.usuario.referenciaDireccion,
      p_Fecha_Alta: '',
      p_Fecha_Baja: '',
      p_Nombre_Comercial: this.usuario.nombreComercial,
      p_Estado_Juridico: this.usuario.estadoJuridico,
      p_Sincronizacion_Estado: '',
      p_Sincronizacion_Fecha: '',
      p_Usuario: '',
    };

    const req2: Solicitante2 = {} as Solicitante2;

    this.tupaGenericaService.agregarUsuario(req).subscribe((data: AgregarUsuarioOut) => {
      if (data.code !== '000') {
        this.showModalAlert = true;
        this.title = 'Error';
        this.content = 'Error al traer los datos';
        return;
      }
      req2.persona_Id = data.data;
    });

    req2.nombre_Razon_Social = this.usuario.nombreRazonSocial;
    req2.persona_Tipo = this.usuario.personaTipo;
    req2.documento_Tipo = this.usuario.documentoTipo;
    req2.documento_Numero = this.usuario.documentoNumero;
    req2.apellido_Paterno = this.usuario.apellidoPaterno;
    req2.apellido_Materno = this.usuario.apellidoMaterno;
    req2.nombres = this.usuario.nombres;
    req2.direccion = this.usuario.direccion;
    req2.nomb_Dpto_Dpt = this.usuario.departamento;
    req2.nomb_Prov_Tpr = this.usuario.provincia;
    req2.nomb_Dist_Tdi = this.usuario.distrito;
    req2.telefono = this.usuario.telefono;
    req2.telefono_Movil = this.usuario.telefonoMovil;
    req2.correo_Electronico = this.usuario.correoElectronico;
    req2.direccion = this.usuario.direccion;

    this.ingresandoUsuario(req2);

    this.eventModal.emit(false);
  }

  ingresandoUsuario(req: Solicitante2) {
    this.tupaGenericaDatosSoService.actualizarDatos(req);
  }

  closeModalAlert(event: boolean) {
    this.showModalAlert = event;
  }

  closeModal() {
    this.eventModal.emit(false);
  }
}
