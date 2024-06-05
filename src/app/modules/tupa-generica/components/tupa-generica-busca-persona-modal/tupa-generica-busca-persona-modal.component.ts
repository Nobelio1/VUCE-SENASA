import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitante } from '../../interfaces/tupa-generica.interface';
import { TupaGenericaDatosSoService } from '../../services/tupa-generica-datos-so.service';
import { TupaGeDetalleOtroUsuarioService } from 'src/app/modules/tupa-ge-detalle/services/tupa-ge-detalle-otro-usuario.service';

export interface PersonaSelect {
  data: Solicitante;
  modal: boolean;
}

@Component({
  selector: 'app-tupa-generica-busca-persona-modal',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './tupa-generica-busca-persona-modal.component.html',
  styles: ``,
})
export class TupaGenericaBuscaPersonaModalComponent {
  @Input() showModal = false;
  @Input() otroSoliciante = false;
  @Output() eventModal = new EventEmitter<boolean>();

  @Input() personas: Solicitante[] = [];

  public title: string = '';

  constructor(
    private tupaGenericaDatosSoService: TupaGenericaDatosSoService,
    private tupaGeDetalleOtroUsuarioService: TupaGeDetalleOtroUsuarioService,
  ) {}

  seleccionarPersona(persona: Solicitante) {
    if (this.otroSoliciante) {
      this.tupaGeDetalleOtroUsuarioService.actualizarDatos(persona);
    } else {
      this.tupaGenericaDatosSoService.actualizarDatos(persona);
    }

    this.eventModal.emit(false);
  }

  closeModal() {
    this.eventModal.emit(false);
  }
}
