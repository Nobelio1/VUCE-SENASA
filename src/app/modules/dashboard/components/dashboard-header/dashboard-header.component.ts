import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DashboardHeaderComponent {
  @Input() title: string = '';
  @Input() tupa: boolean = true;
}
