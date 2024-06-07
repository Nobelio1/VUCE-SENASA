import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Pipe } from '@angular/core';
import { TupaGeDetalleService } from '../../services/tupa-ge-detalle.service';
import {
  Bancos,
  CptPago,
  ListarBancos,
  Servicio,
  ValidarExpedienteOut,
} from '../../interfaces/tupa-ge-detalle.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TupaGeDetalleConceptoPagoService } from '../../services/tupa-ge-detalle-concepto-pago.service';
import { TupaGeDetalleServiciosService } from '../../services/tupa-ge-detalle-servicios.service';

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

  constructor(
    private tupaGeDetalleConceptoPagoService: TupaGeDetalleConceptoPagoService,
    private tupaGeDetalleService: TupaGeDetalleService,
    private tupaGeDetalleServiciosService: TupaGeDetalleServiciosService,
    private fb: FormBuilder,
  ) {}

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

    const codExpendinte: Servicio[] = this.tupaGeDetalleServiciosService.obtenerLista();
    let existeCodExp = false;

    codExpendinte.forEach((element) => {
      if (element.pcodexpediente) {
        existeCodExp = true;
      }
    });

    if (existeCodExp) {
      this.tupaGeDetalleConceptoPagoService
        .enviarCodigoExpediente(codExpendinte[0].pcodexpediente!)
        .subscribe((data: ValidarExpedienteOut) => {
          if (data.code !== '000') throw new Error('Error al enviar el codigo de expediente');

          console.log(data.data);
        });
    }

    const pago: CptPago = {
      tipoPago: this.form.controls['tipoPago'].value,
      banco: this.form.controls['banco'].value,
      nroCuenta: this.form.controls['nroCuenta'].value,
      nroOperacion: this.form.controls['nroOperacion'].value,
      fecha: this.form.controls['fechaDeposito'].value,
      monto: +this.form.controls['monto'].value,
    };

    const listaActual = this.tupaGeDetalleConceptoPagoService.obtenerLista();
    listaActual.push(pago);
    this.tupaGeDetalleConceptoPagoService.actualizarListaPagos(listaActual);
    this.eventModal.emit(false);
    this.limpiarForm();
  }

  limpiarForm() {
    this.form.reset('');
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
