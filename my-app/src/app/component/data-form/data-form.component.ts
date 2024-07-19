import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DataStructure {
  name: string,
  amount: number
}


@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [CommonModule, DatePickerComponent, FormsModule,
    MatSelectModule, MatFormFieldModule,
    MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule
  ],
 
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {

  @Output() onaddTask: EventEmitter<DataStructure> = new EventEmitter();
  @Input() data: any;

  model: DataStructure = {
    name: '',
    amount: 0,

  };

  ngOnInit(): void {
    if (this.data) {
      console.log('Initial Data:', this.data);
      debugger
      this.model = { ...this.data }; // Initialize form model with incoming data
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const formData: DataStructure = {
        name: this.model.name,
        amount: this.model.amount,
      };

      console.log('Form Data Submitted:', formData);
      this.onaddTask.emit(formData); // Emit form data to parent component
      form.resetForm(); // Reset the form after submission
    }
  }

}