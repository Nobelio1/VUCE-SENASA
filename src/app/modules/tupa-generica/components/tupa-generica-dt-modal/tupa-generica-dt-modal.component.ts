import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListarTipoDocumentos, TipoDocumentos, Ubigeo } from '../../interfaces/tupa-generica.interface';
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
