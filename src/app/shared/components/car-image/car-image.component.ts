import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-image',
  standalone: true,
  imports: [],
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.scss'
})
export class CarImageComponent {
  @Input() imageUrl: string | null = null;
}
