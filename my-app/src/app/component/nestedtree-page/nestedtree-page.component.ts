import { Component } from '@angular/core';
import { NestedTreeComponent } from '../nested-tree/nested-tree.component';
import { TreeWithCheckBoxComponent } from '../tree-with-check-box/tree-with-check-box.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-nestedtree-page',
  standalone: true,
  imports: [NestedTreeComponent,TreeWithCheckBoxComponent,TabsComponent],
  templateUrl: './nestedtree-page.component.html',
  styleUrl: './nestedtree-page.component.css'
})
export class NestedtreePageComponent {

}
