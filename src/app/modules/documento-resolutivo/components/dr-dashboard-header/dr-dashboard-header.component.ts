import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-dr-dashboard-header',
  templateUrl: './dr-dashboard-header.component.html',
  standalone: true,
  imports: [CommonModule, ModalAlertComponent, SpinnerComponent],
})
export class DrDashboardHeaderComponent implements OnInit {
  @Input() title: string = '';

  //Modal Alert
  public showModalAlert: boolean = false;
  public title2: string = '';
  public content: string = '';

  //Spinner
  public loadingContent: string = 'Cargando...';
  public loading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log('VIVA LA PEPAAAAAAAAAAAAAA');
  }

  contextLoading(content: string) {
    this.loading = !this.loading;
    this.loadingContent = content;
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
