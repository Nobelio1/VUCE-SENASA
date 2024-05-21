import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tupa-generica-dt-modal',
  templateUrl: './tupa-generica-dt-modal.component.html',
  standalone: true,
  imports: [NgIf],
})
export class TupaGenericaDtModalComponent {
  @Input() showModal = false;
  @Output() eventModal = new EventEmitter<boolean>();

  changeModal() {
    this.eventModal.emit(false);
  }
}
