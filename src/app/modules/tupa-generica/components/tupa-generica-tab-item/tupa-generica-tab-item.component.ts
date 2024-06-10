import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaGenericaInterface } from '../../interfaces/tupa-generica.interface';
import { InfoExpedienteService } from '../../services/info-expediente.service';

@Component({
  selector: 'app-tupa-generica-tab-item',
  templateUrl: './tupa-generica-tab-item.component.html',
  standalone: true,
  imports: [],
})
export class TupaGenericaTabItemComponent {
  @Input()
  item!: TupaGenericaInterface;

  @Output() eventClick = new EventEmitter<TupaGenericaInterface>();

  constructor(private infoExpedienteService: InfoExpedienteService) {}

  public onClick() {
    this.eventClick.emit(this.item);
  }

  public solicitudCompleta(item: TupaGenericaInterface): boolean {
    if (item.name === 'Información del expediente') {
      return this.infoExpedienteService.obtenerGuardadoCompleto();
    }

    return false;
  }
}
