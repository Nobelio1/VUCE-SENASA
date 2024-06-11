import { Component, Input, OnInit } from '@angular/core';
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-rr-dashboard-header',
  templateUrl: './rr-dashboard-header.component.html',
  standalone: true,
  imports: [ModalAlertComponent],
})
export class RrDashboardHeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() tupa: boolean = true;

  public guardado: boolean = false;

  public nombreSolicitante: string = '';

  //Modal Alert
  public showModalAlert: boolean = false;
  public title2: string = '';
  public content: string = '';

  constructor() {}

  ngOnInit(): void {
    this.cargarNombre();
  }

  cargarNombre() {
    this.nombreSolicitante = localStorage.getItem('nombreSolicitante') || '';
  }

  mostrarAlerta(title: string, content: string) {
    this.showModalAlert = true;
    this.title2 = title;
    this.content = content;
  }

  closeModalAlert(event: boolean) {
    this.showModalAlert = event;
  }
}
