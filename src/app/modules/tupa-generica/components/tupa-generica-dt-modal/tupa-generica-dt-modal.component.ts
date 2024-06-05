import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ListarTipoDocumentos,
  RegistroUsuario,
  TipoDocumentos,
  Ubigeo,
} from '../../interfaces/tupa-generica.interface';
import { TupaGenericaService } from '../../services/tupa-generica.service';
import { TupaGenericaDatosSoService } from '../../services/tupa-generica-datos-so.service';

@Component({
  selector: 'app-tupa-generica-dt-modal',
  templateUrl: './tupa-generica-dt-modal.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
})
export class TupaGenericaDtModalComponent implements OnInit {
  @Input() showModal = false;
  @Output() eventModal = new EventEmitter<boolean>();

  public form!: FormGroup;

  public tipoDocumentos: TipoDocumentos[] = [];

  public departamentos: Ubigeo[] = [];
  public provincias: Ubigeo[] = [];
  public distritos: Ubigeo[] = [];

  public selectedDep: string = '';
  public selectedPro: string = '';
  public selectedDis: string = '';

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
        throw new Error('Error al traer la data');
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
      return console.log('El numero ruc esta vacio o no es valido');
    }

    this.tupaGenericaService.getRegistrosSunat(ruc).subscribe((data: RegistroUsuario) => {
      this.setForm(data, '04');
    });
  }

  buscarReniec() {
    const dni: string = this.form.controls['nroDni'].value;

    if (dni === '') {
      return console.log('El numero ruc esta vacio o no es valido');
    }

    this.tupaGenericaService.getRegistroReniec(dni).subscribe((data: RegistroUsuario) => {
      this.setForm(data, '01');
    });
  }

  //dni: 01
  //ruc: 04

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

  addPerson() {
    if (this.form.invalid) {
      console.log('Error en el formulario');
      return;
    }
    this.eventModal.emit(false);
  }

  closeModal() {
    this.eventModal.emit(false);
  }
}
