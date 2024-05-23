import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TupaGenericaDtModalComponent } from '../tupa-generica-dt-modal/tupa-generica-dt-modal.component';
import { TupaGenericaService } from '../../services/tupa-generica.service';
import { ListarTipoDocumentos, TipoDocumentos } from '../../interfaces/tupa-generica.interface';

@Component({
  selector: 'app-tupa-generica-datos-solicitante',
  templateUrl: './tupa-generica-datos-solicitante.component.html',
  standalone: true,
  imports: [ButtonComponent, NgIf, TupaGenericaDtModalComponent, NgFor],
})
export class TupaGenericaDatosSolicitanteComponent implements OnInit {
  showModal = false;
  tipoDocumentos: TipoDocumentos[] = [];

  constructor(private tupaGenericaService: TupaGenericaService) {}

  ngOnInit(): void {
    this.listDocumentos();
  }

  listDocumentos() {
    this.tupaGenericaService.listTipoDocumento().subscribe((data: ListarTipoDocumentos) => {
      if (data.code !== '000') {
        throw new Error('Error al traer la data');
      }

      this.tipoDocumentos = data.data;
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }
}
