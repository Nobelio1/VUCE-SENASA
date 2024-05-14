import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tupa05TabInterface } from '../../interfaces/tupa-05-tab.interface';
import { Tupa05TabItemComponent } from '../tupa-05-tab-item/tupa-05-tab-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tupa-05-tab-header',
  templateUrl: './tupa-05-tab-header.component.html',
  standalone: true,
  imports: [Tupa05TabItemComponent, NgFor],
})
export class Tupa05TabHeaderComponent {
  @Input() tabs: Tupa05TabInterface[] = [];

  @Output() eventSelected = new EventEmitter<Tupa05TabInterface>();

  onSelected(item: Tupa05TabInterface) {
    this.eventSelected.emit(item);
  }
}
