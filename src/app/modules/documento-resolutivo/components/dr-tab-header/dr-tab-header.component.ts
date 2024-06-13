import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrTabItemComponent } from '../dr-tab-item/dr-tab-item.component';
import { DocumentoResolutivoInterface } from '../../interfaces/documento-resolutivo.interface';

@Component({
  selector: 'app-dr-tab-header',
  templateUrl: './dr-tab-header.component.html',
  standalone: true,
  imports: [NgFor, DrTabItemComponent],
})
export class DrTabHeaderComponent {
  @Input() tabs: DocumentoResolutivoInterface[] = [];

  @Output() eventSelected = new EventEmitter<DocumentoResolutivoInterface>();

  onSelected(item: DocumentoResolutivoInterface) {
    this.eventSelected.emit(item);
  }
}
