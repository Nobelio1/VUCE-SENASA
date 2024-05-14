import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaGeDetalleInterface } from '../../interfaces/tupa-ge-detalle.interface';

@Component({
  selector: 'app-tupa-ge-detalle-tab-item',
  templateUrl: './tupa-ge-detalle-tab-item.component.html',
  standalone: true,
  imports: [],
})
export class TupaGeDetalleTabItemComponent {
  @Input()
  item!: TupaGeDetalleInterface;

  @Output() eventClick = new EventEmitter<TupaGeDetalleInterface>();

  public onClick() {
    this.eventClick.emit(this.item);
  }
}
