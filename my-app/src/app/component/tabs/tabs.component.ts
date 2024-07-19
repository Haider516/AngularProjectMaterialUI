import { Component } from '@angular/core';
import { MatTab, MatTabsModule} from '@angular/material/tabs';
import { TreeWithCheckBoxComponent } from '../tree-with-check-box/tree-with-check-box.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule,MatTab,MatTabsModule,TreeWithCheckBoxComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
 
})
export class TabsComponent {

}
