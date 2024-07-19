import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { DataTableDataSource } from './data-table-datasource';
import { ButtonComponent } from '../button/button.component';
import { DialogElementsExample } from '../dialog/dialog.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DataTableItem } from '../../tableDataInterface';
import { TableCrudService } from '../../service/table-crud.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  standalone: true,
  imports: [DialogDeleteComponent, DialogElementsExample,
    MatFormFieldModule, ReactiveFormsModule, MatTableModule,
    MatPaginatorModule, MatSortModule, ButtonComponent,
    MatFormFieldModule, MatInputModule]
})

export class DataTableComponent  implements AfterViewInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;

  //  changes
  dataSource: DataTableDataSource;

  constructor(private tableCrudService: TableCrudService) {
    this.dataSource = new DataTableDataSource(this.tableCrudService);
  }


  // changes

  // ngOnInit(): void {
  //   this.dataSource.filterPredicate = (data: DataTableItem, filter: string) => {
  //     return !filter || data.level.toLowerCase() === filter.toLowerCase();
  //   };
  // }


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'amount', 'actions'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

}
