import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentoResolutivoInterface } from '../../interfaces/documento-resolutivo.interface';

@Component({
  selector: 'app-dr-tab-item',
  templateUrl: './dr-tab-item.component.html',
  standalone: true,
  imports: [],
})
export class DrTabItemComponent {
  @Input()
  item!: DocumentoResolutivoInterface;

  @Output() eventClick = new EventEmitter<DocumentoResolutivoInterface>();

  public onClick() {
    this.eventClick.emit(this.item);
  }
}
