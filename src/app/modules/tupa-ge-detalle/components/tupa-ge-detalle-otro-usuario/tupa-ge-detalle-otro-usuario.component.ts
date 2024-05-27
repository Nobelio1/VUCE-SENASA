import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tupa-ge-detalle-otro-usuario',
  templateUrl: './tupa-ge-detalle-otro-usuario.component.html',
  standalone: true,
  imports: [NgIf, NgFor],
})
export class TupaGeDetalleOtroUsuarioComponent implements OnInit {
  public showModal = false;

  ngOnInit(): void {}

  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }
}
