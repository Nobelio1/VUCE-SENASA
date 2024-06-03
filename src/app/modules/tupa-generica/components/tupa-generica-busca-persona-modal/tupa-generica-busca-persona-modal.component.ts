import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitante } from '../../interfaces/tupa-generica.interface';

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
  @Output() eventModal = new EventEmitter<PersonaSelect>();

  @Input() personas: Solicitante[] = [];

  public title: string = '';

  constructor() {}

  seleccionarPersona(persona: Solicitante) {
    const res: PersonaSelect = {
      data: persona,
      modal: false,
    };
    this.eventModal.emit(res);
  }

  closeModal() {
    const res: PersonaSelect = {
      data: {} as Solicitante,
      modal: false,
    };
    this.eventModal.emit(res);
  }
}
