import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitante2 } from '../../interfaces/tupa-generica.interface';
import { TupaGenericaDatosSoService } from '../../services/tupa-generica-datos-so.service';
import { TupaGeDetalleOtroUsuarioService } from 'src/app/modules/tupa-ge-detalle/services/tupa-ge-detalle-otro-usuario.service';
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';

export interface PersonaSelect {
  data: string;
  modal: boolean;
}

@Component({
  selector: 'app-tupa-generica-busca-persona-modal',
  standalone: true,
  imports: [CommonModule, NgFor, ModalAlertComponent],
  templateUrl: './tupa-generica-busca-persona-modal.component.html',
  styles: ``,
})
export class TupaGenericaBuscaPersonaModalComponent {
  @Input() otroSoliciante = false;

  @Input() showModal = false;
  @Output() eventModal = new EventEmitter<boolean>();

  public showModalAlert: boolean = false;
  public title2: string = '';
  public content: string = '';

  @Input() personas: Solicitante2[] = [];

  public title: string = '';

  constructor(
    private tupaGenericaDatosSoService: TupaGenericaDatosSoService,
    private tupaGeDetalleOtroUsuarioService: TupaGeDetalleOtroUsuarioService,
  ) {}

  seleccionarPersona(persona: Solicitante2) {
    if (this.otroSoliciante) {
      this.tupaGeDetalleOtroUsuarioService.actualizarDatos(persona);
    } else {
      this.tupaGenericaDatosSoService.actualizarDatos(persona);
    }

    this.eventModal.emit(false);
  }

  closeModalAlert(event: boolean) {
    this.showModalAlert = event;
  }

  closeModal() {
    this.eventModal.emit(false);
  }

  tipoDocumento(id: string): string {
    if (id === '01') return 'DNI';
    if (id === '03') return 'PASAPORTE';
    if (id === '10') return 'CED. DIPLOMATICA DE IDENTIDAD';
    if (id === '07') return 'CARNET DE FUERZAS POLICIALES';
    if (id === '04') return 'RUC';
    if (id === '05') return 'C.EXT';

    return '';
  }
}
