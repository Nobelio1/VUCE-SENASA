import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListarTipoDocumentos, TipoDocumentos } from '../../interfaces/tupa-generica.interface';
import { TupaGenericaService } from '../../services/tupa-generica.service';

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

  constructor(private tupaGenericaService: TupaGenericaService, private fb: FormBuilder) {}

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
  }

  listDocumentos() {
    this.tupaGenericaService.listTipoDocumento().subscribe((data: ListarTipoDocumentos) => {
      if (data.code !== '000') {
        throw new Error('Error al traer la data');
      }

      this.tipoDocumentos = data.data;
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
