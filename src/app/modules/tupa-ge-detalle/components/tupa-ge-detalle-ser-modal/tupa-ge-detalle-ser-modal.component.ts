import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tupa-ge-detalle-ser-modal',
  templateUrl: './tupa-ge-detalle-ser-modal.component.html',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
})
export class TupaGeDetalleSerModalComponent implements OnInit, OnChanges {
  @Input() showModal = false;
  @Input() servicio: string = '';
  @Output() eventModal = new EventEmitter<boolean>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      serv: [''],
      cantidad: [''],
      costo: [''],
    });

    this.form.controls['serv'].disable();
    this.setFormValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setFormValue();
  }

  private setFormValue() {
    if (this.servicio) {
      this.form.patchValue({
        serv: this.servicio,
      });
    }
  }

  changeModal() {
    this.eventModal.emit(false);
  }
}
