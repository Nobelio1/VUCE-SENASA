import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ModalAlertComponent {
  @Input() showModal: boolean = false;
  @Input() title: string = '';
  @Input() content: string = '';
  @Output() eventModal = new EventEmitter<boolean>();

  closeModal() {
    this.eventModal.emit(false);
  }
}
