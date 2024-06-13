import { Component } from '@angular/core';
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-dr-info-expendiente',
  templateUrl: './dr-info-expendiente.component.html',
  standalone: true,
  imports: [ModalAlertComponent],
})
export class DrInfoExpendienteComponent {
  //Modal Alert
  public showModalAlert: boolean = false;
  public title: string = '';
  public content: string = '';

  mostrarAlerta(title: string, content: string) {
    this.showModalAlert = true;
    this.title = title;
    this.content = content;
  }

  closeModalAlert(event: boolean) {
    this.showModalAlert = event;
  }
}
