import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { Tupa05TabContainerComponent } from 'src/app/modules/tupa-05/components/tupa-05-tab-container/tupa-05-tab-container.component';

@Component({
  selector: 'app-tupa-05',
  templateUrl: './tupa-05-page.component.html',
  standalone: true,
  imports: [DashboardHeaderComponent, Tupa05TabContainerComponent],
})
export class Tupa05Component {}
