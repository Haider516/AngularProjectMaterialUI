import { Routes } from '@angular/router';
import { TablePageComponent } from './component/table-page/table-page.component';
import { SecondPageComponent } from './component/second-page/second-page.component';
import { CardComponent } from './component/card/card.component';
import { FlattreePageComponent } from './component/flattree-page/flattree-page.component';
import { NestedtreePageComponent } from './component/nestedtree-page/nestedtree-page.component';

export const routes: Routes = [

  { path: '', component: TablePageComponent },
  { path: 'second', component: SecondPageComponent },
  { path: 'card', component: CardComponent},
  { path: 'nested-tree', component: NestedtreePageComponent },
  { path: 'flat-tree', component: FlattreePageComponent }
];
