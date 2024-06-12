import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './spinner.component.html',
  styles: ``,
})
export class SpinnerComponent {
  @Input() content: string = 'Loading...';
  @Input() show: boolean = false;
}
