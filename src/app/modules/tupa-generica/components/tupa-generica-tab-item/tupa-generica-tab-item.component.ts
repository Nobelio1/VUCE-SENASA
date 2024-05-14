import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaGenericaInterface } from '../../interfaces/tupa-generica.interface';

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

  public onClick() {
    this.eventClick.emit(this.item);
  }
}
