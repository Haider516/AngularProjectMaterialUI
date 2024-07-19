import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-add-table-data',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './add-table-data.component.html',
  styleUrl: './add-table-data.component.css'
})
export class AddTableDataComponent {

}
