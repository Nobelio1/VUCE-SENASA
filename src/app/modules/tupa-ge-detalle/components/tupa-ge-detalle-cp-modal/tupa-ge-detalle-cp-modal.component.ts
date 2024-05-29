import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Pipe } from '@angular/core';
import { TupaGeDetalleService } from '../../services/tupa-ge-detalle.service';
import { Bancos, ListarBancos } from '../../interfaces/tupa-ge-detalle.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tupa-ge-detalle-cp-modal',
  templateUrl: './tupa-ge-detalle-cp-modal.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, JsonPipe],
})
export class TupaGeDetalleCpModalComponent implements OnInit {
  @Input() showModal = false;
  @Output() eventModal = new EventEmitter<boolean>();

  public bancos: Bancos[] = [];

  public form!: FormGroup;

  constructor(private tupaGeDetalleService: TupaGeDetalleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tipoPago: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      nroCuenta: ['', [Validators.required]],
      nroOperacion: ['', [Validators.required, Validators.minLength(8)]],
      fechaDeposito: ['', [Validators.required]],
      monto: ['', [Validators.required]],
    });

    this.form.controls['nroCuenta'].disable();

    this.listarBancos();
  }

  sendPayment() {
    if (this.form.invalid) return;
    console.log(this.form.value);
    this.eventModal.emit(false);
  }

  closeModal() {
    this.eventModal.emit(false);
  }

  bancoSeleccionado(banco: any) {
    this.form.controls['nroCuenta'].setValue(banco.target.value);
  }

  listarBancos() {
    this.tupaGeDetalleService.listBancos().subscribe((data: ListarBancos) => {
      if (data.code !== '000') throw new Error('Error al traer los bancos');
      this.bancos = data.data;
    });
  }
}
