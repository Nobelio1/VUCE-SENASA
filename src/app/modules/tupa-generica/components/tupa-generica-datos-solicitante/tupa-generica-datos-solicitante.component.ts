import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TupaGenericaDtModalComponent } from '../tupa-generica-dt-modal/tupa-generica-dt-modal.component';
import { TupaGenericaService } from '../../services/tupa-generica.service';
import { ListarTipoDocumentos, TipoDocumentos } from '../../interfaces/tupa-generica.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tupa-generica-datos-solicitante',
  templateUrl: './tupa-generica-datos-solicitante.component.html',
  standalone: true,
  imports: [ButtonComponent, NgIf, TupaGenericaDtModalComponent, NgFor, ReactiveFormsModule],
})
export class TupaGenericaDatosSolicitanteComponent implements OnInit {
  public form!: FormGroup;
  public form2!: FormGroup;
  public form3!: FormGroup;

  public showModal = false;
  public tipoDocumentos: TipoDocumentos[] = [];

  constructor(private tupaGenericaService: TupaGenericaService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      busqueda: [''],
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
  }

  listDocumentos() {
    this.tupaGenericaService.listTipoDocumento().subscribe((data: ListarTipoDocumentos) => {
      if (data.code !== '000') {
        throw new Error('Error al traer la data');
      }

      this.tipoDocumentos = data.data;
    });
  }

  sendDatosSolicitante() {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }
}
