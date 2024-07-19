import { Component } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { DialogElementsExample } from '../dialog/dialog.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DataFormComponent } from '../data-form/data-form.component';
import { MatCommonModule } from '@angular/material/core';
import { AddTableDataComponent } from '../add-table-data/add-table-data.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [CommonModule,AddTableDataComponent, MatCommonModule,DialogElementsExample,DataFormComponent,DatePickerComponent,DataTableComponent ,NavComponent,ToolbarComponent],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.css'
})
export class TablePageComponent {

}
