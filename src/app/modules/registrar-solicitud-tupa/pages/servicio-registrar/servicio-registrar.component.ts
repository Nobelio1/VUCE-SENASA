import { Component } from '@angular/core';
import { DashboardHeaderComponent } from 'src/app/modules/dashboard/components/dashboard-header/dashboard-header.component';
import { ReSoTupaHeaderComponent } from '../../components/re-so-tupa-header/re-so-tupa-header.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Routes {
  name: string;
  url?: string;
}

@Component({
  selector: 'app-servicio-registrar',
  templateUrl: './servicio-registrar.component.html',
  standalone: true,
  imports: [ReSoTupaHeaderComponent, CommonModule, RouterLink],
})
export class ServicioRegistrarComponent {
  public tupaGenerico: Routes[] = [
    {
      name: 'Solicitud genérica para procedimientos TUPA.',
    },
  ];

  public cuarentenaVegetal: Routes[] = [
    {
      name: 'Solicitud para la obtención del Permiso Fitosanitario de Importación - PFI de plantas, productos vegetales y otros artículos reglamentados.',
    },
    {
      name: 'Solicitud para la obtención del Permiso Fitosanitario de Tránsito Internacional - PFTI de plantas, productos vegetales y otros artículos reglamentados.',
    },
    {
      name: 'Solicitud de modificación Permiso Fitosanitario de Importación - PFI de plantas, productos vegetales y otros artículos reglamentados.',
    },
    {
      name: 'Solicitud para la obtención del IIV/APIV para la importación o tránsito internacional de plantas, productos vegetales y otros artículos reglamentados.',
    },
    {
      name: 'Solicitud para la obtención del certificado fitosanitario para la exportación o Reexportación de plantas y productos vegetales y Certificación de exportación para productos procesados e industrializados.',
    },
    {
      name: 'Solicitud de modificación (Addendum, nuevo certificado o copia del certificado) del certificado fitosanitario para la exportación o Reexportación de plantas y productos vegetales y Certificación de exportación para productos procesados.',
    },
    { name: 'Solicitud de registro de almacén para guarda custodia.' },
    { name: 'Solicitud de Modificación del registro de almacén para guarda custodia.' },
    { name: 'Solicitud de Certificación fitosanitaria de lugares de producción y su modificación.' },
    {
      name: 'Solicitud de Registro de importadores, lugares de producción y ténicos de material sujeto a cuarentena posentrada.',
    },
    {
      name: 'Solicitud para la certificación de Funcionamiento de plantas empacadoras, plantas de tratamiento cuarentenario, plantas de tratamiento cuarentenario y de poscosecha, y de centro de acopio - Inscripción en el registro de acopiadores.',
    },
  ];

  public cuarentenaAnimal: Routes[] = [
    {
      name: 'Solicitud para la obtención del Permiso Sanitario (PSI) de animales, producto y subproductos de origen animal e insectos de valor benefico.',
    },
    {
      name: 'Solicitud para la renovación y modificación del Permiso Sanitario (PSI) de animales, producto y subproductos de origen animal e insectos de valor benefico.',
    },
    {
      name: 'Solicitud para la obtención del IIV/APIV para la importación o tránsito internacional de animales, productos y subproductos de origen animal.',
    },
    {
      name: 'Solicitud para la obtención del certificado zoosanitario para la exportación de animales, productos y subproductos de origen animal.',
    },
    {
      name: 'Solicitud de Autorización Sanitaria de establecimientos para exportación de productos y subproductos de origen animal.',
    },
    {
      name: 'Solicitud para la renovación de Autorización Sanitaria de establecimientos para exportación de productos y subproductos de origen animal.',
    },
    {
      name: 'Solicitud para la modificación de Autorización Sanitaria de establecimientos para exportación de productos y subproductos de origen animal.',
    },
  ];

  public insumosPecuarios: Routes[] = [
    {
      name: 'Solicitud para el registro o renovación de productos de uso veterinario farmacológicos.',
    },
    {
      name: 'Solicitud para la obtención del IIV/APIV para la importación de productos veterinarios y alimentos para animales.',
    },
  ];

  public insumosAgricolas: Routes[] = [
    { name: 'Solicitud de registro de Plaguicida Químico de Uso Agrícola.' },
    {
      name: 'Solicitud de obtención de IIV/APIV para la importación de plaguicidas de uso agrícola - formulado. Con fines comerciales.',
    },
    {
      name: 'Solicitud de obtención de IIV/APIV para la importación de plaguicidas de uso agrícola - formulado. Para uso experimental.',
    },
    {
      name: 'Solicitud de obtención de IIV/APIV para la importación de plaguicidas de uso agrícola - formulado. Muestras.',
    },
    {
      name: 'Solicitud de obtención de IIV/APIV para la importación de plaguicidas de uso agrícola - formulado. Ingrediente Activo grado técnico.',
    },
    {
      name: 'Solicitud de obtención de IIV/APIV para la importación de plaguicidas de uso agrícola - formulado. Consumo propio.',
    },
    {
      name: 'Solicitud de obtención de IIV/APIV para la importación de plaguicidas de uso agrícola - formulado. Integración con SIPTEL.',
    },
  ];
}
