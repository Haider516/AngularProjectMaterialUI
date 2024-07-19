import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { DataTableComponent } from './component/data-table/data-table.component';
import { NavComponent } from './component/nav/nav.component';
import {MatCommonModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatStepperModule,MatCommonModule,CommonModule, MatNativeDateModule,MatSidenavModule,NavComponent,MatSlideToggleModule,DataTableComponent, MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task  Table Crud';
}
