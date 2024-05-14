import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaGenericaInterface } from '../../interfaces/tupa-generica.interface';
import { TupaGenericaTabItemComponent } from '../tupa-generica-tab-item/tupa-generica-tab-item.component';

@Component({
  selector: 'app-tupa-generica-tab-header',
  templateUrl: './tupa-generica-tab-header.component.html',
  standalone: true,
  imports: [TupaGenericaTabItemComponent, NgFor],
})
export class TupaGenericaTabHeaderComponent {
  @Input() tabs: TupaGenericaInterface[] = [];

  @Output() eventSelected = new EventEmitter<TupaGenericaInterface>();

  onSelected(item: TupaGenericaInterface) {
    this.eventSelected.emit(item);
  }
}
