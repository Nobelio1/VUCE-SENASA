import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarSolicitudTupaComponent } from './registrar-solicitud-tupa.component';
import { ServicioRegistrarComponent } from './pages/servicio-registrar/servicio-registrar.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrarSolicitudTupaComponent,
    children: [
      { path: '', redirectTo: 'servicios', pathMatch: 'full' },
      { path: 'servicios', component: ServicioRegistrarComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarSolicitudTupaRoutingModule {}
