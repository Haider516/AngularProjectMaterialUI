
import { Component } from '@angular/core';
import { DialogElementsExample } from '../dialog/dialog.component';
import { DataFormComponent } from '../data-form/data-form.component';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { MatCommonModule } from '@angular/material/core';
import { DynamicGridListComponent } from '../dynamic-grid-list/dynamic-grid-list.component';
import { DividerComponent } from '../divider/divider.component';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';
import { ChipsComponent } from '../chips/chips.component';

@Component({
  selector: 'app-second-page',
  standalone: true,
  imports: [CommonModule,MatCommonModule, ChipsComponent,ExpansionPanelComponent, DividerComponent,DialogElementsExample, DataFormComponent, DatePickerComponent,DynamicGridListComponent],
  templateUrl: './second-page.component.html',
  styleUrl: './second-page.component.css'
})
export class SecondPageComponent {

}
