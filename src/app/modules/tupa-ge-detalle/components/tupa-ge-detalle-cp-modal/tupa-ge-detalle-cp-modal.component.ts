import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tupa-ge-detalle-cp-modal',
  templateUrl: './tupa-ge-detalle-cp-modal.component.html',
  standalone: true,
  imports: [NgIf],
})
export class TupaGeDetalleCpModalComponent {
  @Input() showModal = false;
  @Output() eventModal = new EventEmitter<boolean>();

  changeModal() {
    this.eventModal.emit(false);
  }
}
