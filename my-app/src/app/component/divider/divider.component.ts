import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.css'
})
export class DividerComponent {

}
