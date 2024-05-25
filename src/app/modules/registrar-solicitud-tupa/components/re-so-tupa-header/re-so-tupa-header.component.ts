import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-re-so-tupa-header',
  templateUrl: './re-so-tupa-header.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ReSoTupaHeaderComponent {
  @Input() title: string = '';
  @Input() tupa: boolean = true;
}
