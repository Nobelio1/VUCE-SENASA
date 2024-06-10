import {
  ActualizarRecibo,
  ActualizarReciboIn,
  ActualizarReciboOut,
  GrabarInactivo,
  GrabarInactivoOut,
  GuardarSolicitud,
  GuardarSolicitudOut,
} from './../../../tupa-generica/interfaces/guadar-solicitud.interface';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TupaGeDetalleConceptoPagoService } from 'src/app/modules/tupa-ge-detalle/services/tupa-ge-detalle-concepto-pago.service';
import { TupaGeDetalleOtroUsuarioService } from 'src/app/modules/tupa-ge-detalle/services/tupa-ge-detalle-otro-usuario.service';
import { TupaGeDetalleServiciosService } from 'src/app/modules/tupa-ge-detalle/services/tupa-ge-detalle-servicios.service';
import { TupaGenericaDatosSoService } from 'src/app/modules/tupa-generica/services/tupa-generica-datos-so.service';
import { Solicitante2 } from '../../../tupa-generica/interfaces/tupa-generica.interface';
import { CptPago, Servicio } from 'src/app/modules/tupa-ge-detalle/interfaces/tupa-ge-detalle.interface';
import { GuardarSolicitudIn } from 'src/app/modules/tupa-generica/interfaces/guadar-solicitud.interface';
import { GuardarSolicitudService } from 'src/app/modules/tupa-generica/services/guardar-solicitud.service';
import { GrabarInactivoIn } from '../../../tupa-generica/interfaces/guadar-solicitud.interface';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() tupa: boolean = true;

  public datosSolicitante: Solicitante2 = {} as Solicitante2;
  public listaServicios: Servicio[] = [];
  public otroUsuario: Solicitante2 = {} as Solicitante2;
  public conceptoPago: CptPago[] = [];
  public idRepresentante: string = '';
  public idProcedimiento: string = '';

  public resGrabaSolicitud: GuardarSolicitud = {} as GuardarSolicitud;
  public resGrabarInactivo: GrabarInactivo = {} as GrabarInactivo;
  public resActualizarRecibo: ActualizarRecibo = {} as ActualizarRecibo;

  constructor(
    private guardarSolicitudService: GuardarSolicitudService,
    private tupaGenericaDatosSoService: TupaGenericaDatosSoService,
    private tupaGeDetalleServiciosService: TupaGeDetalleServiciosService,
    private tupaGeDetalleOtroUsuarioService: TupaGeDetalleOtroUsuarioService,
    private tupaGeDetalleConceptoPagoService: TupaGeDetalleConceptoPagoService,
  ) {}

  ngOnInit(): void {}

  enviarSolicitud() {
    this.datosSolicitante = this.tupaGenericaDatosSoService.obtenerLista();
    this.listaServicios = this.tupaGeDetalleServiciosService.obtenerLista();
    this.otroUsuario = this.tupaGeDetalleOtroUsuarioService.obtenerLista();
    this.conceptoPago = this.tupaGeDetalleConceptoPagoService.obtenerLista();
    this.idRepresentante = this.tupaGenericaDatosSoService.obtenerIdRep();
    this.idProcedimiento = this.tupaGeDetalleServiciosService.obtenerIdProcedimiento();

    const detalleRecibo: string = this.detalleRecibo(this.listaServicios);
    const detallePago: string = this.detallePago(this.conceptoPago);

    const solicitud: GuardarSolicitudIn = {
      pcentrotramite: 'OFICINA SENSANA - CENTRAL',
      pcanal: 'BPM',
      ppersonaid: this.datosSolicitante.persona_Id,
      pprocedimientotupa: this.idProcedimiento,
      puserid: '', //De sesion
      prepresentanteid: this.idRepresentante ? this.idRepresentante : '',
      pcodexpediente: this.listaServicios[0].pcodexpediente ? this.listaServicios[0].pcodexpediente : '',
      //Respuesta
      pcodsolicitud: '',
      pcodigostddoc: '',
      pcodorden: '',
    };

    this.resGrabaSolicitud = this.grabarSolicitud(solicitud);

    const inactivo: GrabarInactivoIn = {
      pcentrotramite: 'OFICINA SENSANA - CENTRAL',
      pcanal: 'BPM',
      ppersonaid: this.datosSolicitante.persona_Id,
      ppersonaidotro: this.otroUsuario.persona_Id ? this.otroUsuario.persona_Id : '',
      pprocedimientotupa: this.idProcedimiento,
      puserid: '', //De sesion
      pcodexpediente: this.listaServicios[0].pcodexpediente ? this.listaServicios[0].pcodexpediente : '',
      ppersonaidsolicitante: this.otroUsuario.persona_Id
        ? this.otroUsuario.persona_Id
        : this.datosSolicitante.persona_Id,
      prepresentanteid: this.idRepresentante ? this.idRepresentante : '',
      pdetallerecibo: detalleRecibo,
      ppagorecibo: detallePago,
      pdetallevacuna: '',
      pcodorden: '',
    };

    this.resGrabarInactivo = this.grabarInactivo(inactivo);

    const actulizar: ActualizarReciboIn = {
      pcodrecibo: this.resGrabarInactivo.pcodrecibo, //???????
      pucmid: '',
      pcodigostddoc: this.resGrabaSolicitud.pcodigostddoc,
      puserid: '', //De sesion
      pcodexpediente: this.listaServicios[0].pcodexpediente ? this.listaServicios[0].pcodexpediente : '',
    };

    this.resActualizarRecibo = this.actualizarRecibo(actulizar);
  }

  grabarSolicitud(solicitud: GuardarSolicitudIn): GuardarSolicitud {
    this.guardarSolicitudService.grabarSolicitud(solicitud).subscribe((data: GuardarSolicitudOut) => {
      if (data.code !== '000') {
        console.log('Error al grabar solicitud');
        return;
      }

      return data.data[0];
    });

    return {} as GuardarSolicitud;
  }

  grabarInactivo(solicitud: GrabarInactivoIn): GrabarInactivo {
    this.guardarSolicitudService.grabarInactivo(solicitud).subscribe((data: GrabarInactivoOut) => {
      if (data.code !== '000') {
        console.log('Error al grabar inactivo');
        return;
      }

      return data.data[0];
    });

    return {} as GrabarInactivo;
  }

  actualizarRecibo(solicitud: ActualizarReciboIn): ActualizarRecibo {
    this.guardarSolicitudService.actualizarRecibo(solicitud).subscribe((data: ActualizarReciboOut) => {
      if (data.code !== '000') {
        console.log('Error al actualizar recibo');
        return;
      }

      return data.data[0];
    });

    return {} as ActualizarRecibo;
  }

  detalleRecibo(servicio: Servicio[]): string {
    let arr: any[] = [];
    servicio.forEach((ser) => {
      let array: any[] = [];
      array[0] = ser.cantidad;
      array[1] = ser.concepto;
      array[2] = ser.costo;
      arr.push(array.join(']]'));
    });

    return arr.join('<->');
  }

  detallePago(pago: CptPago[]): string {
    let arr: any[] = [];
    pago.forEach((pag) => {
      let array: any[] = [];
      array[0] = pag.tipoPago;
      array[1] = pag.monto;
      array[2] = pag.nroCuenta;
      array[3] = pag.fecha;
      array[4] = pag.nroOperacion;
      arr.push(array.join(']]'));
    });

    return arr.join('<->');
  }
}
