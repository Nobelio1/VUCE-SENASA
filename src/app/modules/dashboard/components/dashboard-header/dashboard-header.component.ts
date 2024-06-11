import {
  ActualizarRecibo,
  ActualizarReciboIn,
  ActualizarReciboOut,
  GrabarInactivo,
  GrabarInactivoOut,
  GuardarSolicitud,
  GuardarSolicitudOut,
  InfoExpendiente,
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
import { InfoExpedienteService } from 'src/app/modules/tupa-generica/services/info-expediente.service';
import { NombresServicio } from '../../../tupa-ge-detalle/services/tupa-ge-detalle-servicios.service';
import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  standalone: true,
  imports: [CommonModule, ModalAlertComponent],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() tupa: boolean = true;
  public guardado: boolean = false;

  //Modal Alert
  public showModalAlert: boolean = false;
  public title2: string = '';
  public content: string = '';

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
    private infoExpedienteService: InfoExpedienteService,
    private router: Router,
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
    let esInvaliddo: boolean = this.validarDatos(
      detalleRecibo,
      detallePago,
      'OFICINA SENASA - CENTRAL',
      this.datosSolicitante.persona_Id,
      this.idProcedimiento,
    );

    let montoValido: boolean = this.montoValido();

    if (esInvaliddo) return;

    if (!montoValido) {
      this.mostrarAlerta('Error', 'El monto ingresado es menos al monto total');
      return;
    }

    const solicitud: GuardarSolicitudIn = {
      pcentrotramite: 'OFICINA SENASA - CENTRAL',
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

    const inactivo: GrabarInactivoIn = {
      pcentrotramite: 'OFICINA SENASA - CENTRAL',
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

    if (!this.listaServicios[0].pcodexpediente) {
      this.guardarSinCodExp(inactivo);
    } else {
      this.guardarConCodExp(solicitud, inactivo);
    }
  }

  validarDatos(recibo: string, pago: string, codigo: string, personaId: string, procetupa: string): boolean {
    if (recibo === '' || pago === '' || codigo === '' || personaId === '' || procetupa === '') {
      this.mostrarAlerta('Error', 'Falta completar los datos');
      return true;
    }
    return false;
  }

  montoValido(): boolean {
    return this.tupaGeDetalleConceptoPagoService.obtenerMontoValido();
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

  //PAGO: UPDATE
  grabarInactivo(solicitud: GrabarInactivoIn): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.guardarSolicitudService.grabarInactivo(solicitud).subscribe((data: GrabarInactivoOut) => {
        if (data.code !== '000') {
          reject('Error al grabar inactivo');
          return;
        }

        this.resGrabarInactivo = data.data[0];
        resolve();
      });
    });
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

  async guardarSinCodExp(solicitud: GrabarInactivoIn) {
    try {
      await this.grabarInactivo(solicitud);

      this.infoExpedienteService.guardadoCompleto = false;

      const nombres: NombresServicio = this.tupaGeDetalleServiciosService.obtenerServicio();
      const fechaHora = new Date().toLocaleString();

      const infoExpe: InfoExpendiente = {
        nroExpediente: this.resGrabarInactivo.pcodexpediente,
        fechaRegistro: fechaHora, //saber donde sale
        oficina: 'SENSANA - CENTRAL',
        area: nombres.area,
        proceso: nombres.proceso,
        servicioTupa: nombres.serivico,
        usuario: this.datosSolicitante.nombre_Razon_Social,
        codRecibo: this.resGrabarInactivo.pcodrecibo,
      };

      localStorage.setItem('nombreSolicitante', JSON.stringify(infoExpe.usuario));

      this.infoExpedienteService.actualizarDatos(infoExpe);
      this.guardado = !this.guardado;
    } catch (error) {
      console.error('Error al grabar inactivo:', error);
    }
  }

  guardarConCodExp(grabar: GuardarSolicitudIn, inactivo: GrabarInactivoIn) {
    this.resGrabaSolicitud = this.grabarSolicitud(grabar);

    const actulizar: ActualizarReciboIn = {
      pcodrecibo: this.resGrabarInactivo.pcodrecibo, //???????
      pucmid: '',
      pcodigostddoc: this.resGrabaSolicitud.pcodigostddoc,
      puserid: '', //De sesion
      pcodexpediente: this.listaServicios[0].pcodexpediente ? this.listaServicios[0].pcodexpediente : '',
    };

    this.resActualizarRecibo = this.actualizarRecibo(actulizar);
    this.guardado = !this.guardado;
    //!! Sin funcionalidad el ultimo servicio
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

  mostrarAlerta(title: string, content: string) {
    this.showModalAlert = true;
    this.title2 = title;
    this.content = content;
  }

  closeModalAlert(event: boolean) {
    this.showModalAlert = event;
  }

  finalizarProceso() {
    this.router.navigate(['/dashboard/registrar-requisitos']);
  }
}
