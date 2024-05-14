import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tupa05TabInterface } from '../../interfaces/tupa-05-tab.interface';

@Component({
  selector: 'app-tupa-05-tab-item',
  templateUrl: './tupa-05-tab-item.component.html',
  standalone: true,
})
export class Tupa05TabItemComponent {
  @Input()
  item!: Tupa05TabInterface;

  @Output() eventClick = new EventEmitter<Tupa05TabInterface>();

  public onClick() {
    this.eventClick.emit(this.item);
  }
}
