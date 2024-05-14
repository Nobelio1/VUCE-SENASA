import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaGeDetalleTabItemComponent } from '../tupa-ge-detalle-tab-item/tupa-ge-detalle-tab-item.component';
import { NgFor } from '@angular/common';
import { TupaGeDetalleInterface } from '../../interfaces/tupa-ge-detalle.interface';

@Component({
  selector: 'app-tupa-ge-detalle-tab-header',
  templateUrl: './tupa-ge-detalle-tab-header.component.html',
  standalone: true,
  imports: [TupaGeDetalleTabItemComponent, NgFor],
})
export class TupaGeDetalleTabHeaderComponent {
  @Input() tabs: TupaGeDetalleInterface[] = [];

  @Output() eventSelected = new EventEmitter<TupaGeDetalleInterface>();

  onSelected(item: TupaGeDetalleInterface) {
    this.eventSelected.emit(item);
  }
}
