import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TupaGeDetalleInterface } from '../../interfaces/tupa-ge-detalle.interface';
import { TupaGeDetalleOtroUsuarioService } from '../../services/tupa-ge-detalle-otro-usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tupa-ge-detalle-tab-item',
  templateUrl: './tupa-ge-detalle-tab-item.component.html',
  standalone: true,
  imports: [],
})
export class TupaGeDetalleTabItemComponent implements OnInit, OnDestroy {
  @Input() item!: TupaGeDetalleInterface;
  @Output() eventClick = new EventEmitter<TupaGeDetalleInterface>();

  public estadoOU: boolean = true;
  public estadoSub!: Subscription;

  constructor(private tupaGeDetalleOtroUsuarioService: TupaGeDetalleOtroUsuarioService) {}

  ngOnInit(): void {
    this.estadoSub = this.tupaGeDetalleOtroUsuarioService.getState.subscribe((estado: boolean) => {
      this.estadoOU = estado;
      this.otroUsuario();
    });
  }

  ngOnDestroy(): void {
    this.estadoSub.unsubscribe();
  }

  public onClick() {
    this.eventClick.emit(this.item);
  }

  public otroUsuario(): boolean {
    if (this.item.name === 'Otro Usuario') {
      return this.estadoOU;
    }
    return false;
  }
}
