import { Component } from '@angular/core';
import { NestedTreeComponent } from '../nested-tree/nested-tree.component';
import { FlatTreeComponent } from '../flat-tree/flat-tree.component';
import { CvComponent } from '../cv/cv.component';

@Component({
  selector: 'app-flattree-page',
  standalone: true,
  imports: [NestedTreeComponent ,FlatTreeComponent,CvComponent],
  templateUrl: './flattree-page.component.html',
  styleUrl: './flattree-page.component.css'
})
export class FlattreePageComponent {

}
