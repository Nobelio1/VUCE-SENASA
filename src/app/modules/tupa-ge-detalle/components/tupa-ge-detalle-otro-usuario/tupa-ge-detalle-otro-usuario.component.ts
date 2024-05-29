import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListarTipoDocumentos, TipoDocumentos } from 'src/app/modules/tupa-generica/interfaces/tupa-generica.interface';
import { TupaGenericaService } from 'src/app/modules/tupa-generica/services/tupa-generica.service';

@Component({
  selector: 'app-tupa-ge-detalle-otro-usuario',
  templateUrl: './tupa-ge-detalle-otro-usuario.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
})
export class TupaGeDetalleOtroUsuarioComponent implements OnInit {
  public showModal = false;
  public tipoDocumentos: TipoDocumentos[] = [];

  public form!: FormGroup;
  public form2!: FormGroup;

  constructor(private tupaGenericaService: TupaGenericaService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
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
  }

  listDocumentos() {
    this.tupaGenericaService.listTipoDocumento().subscribe((data: ListarTipoDocumentos) => {
      if (data.code !== '000') {
        throw new Error('Error al traer la data');
      }

      this.tipoDocumentos = data.data;
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
    console.log('Implementar modal de usario');
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }
}
