import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule,MatFormFieldModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {

}
