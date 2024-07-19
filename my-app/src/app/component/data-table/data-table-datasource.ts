import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { DataTableItem } from '../../tableDataInterface';
import { TableCrudService } from '../../service/table-crud.service';
import { MenuItemHarnessFilters } from '@angular/material/menu/testing';
import { MatTableDataSource } from '@angular/material/table';




// // TODO: replace this with real data from your application
// const EXAMPLE_DATA: DataTableItem[] = data;

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem>  {

  data!: DataTableItem[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
 // filter

  // changess  For Crud
  
  constructor(private tableCrudService: TableCrudService) {
    super();//it is Derived Class 
    this.tableCrudService.getDataSource().subscribe((data: DataTableItem[]) => {
      this.data = data;
    });
    
  }

  // ngOnInit() {
  //   this.dataSource.filterPredicate =
  //       (data: Skill, filter: string) => !filter || data.level == filter;
  // }
  // changes for Crud End

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    debugger
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge( this.tableCrudService.getDataSource(), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'amount': return compare(+a.amount, +b.amount, isAsc);
        default: return 0;
      }
    });
  }

  // private  filterPredicate (data: DataTableItem[]) {
  // data.filterPredicate =
  // (data: Skill, filter: string) => !filter || data.level == filter;
 
  // }

  // applyFilter(data: DataTableItem[]): void {
  //   this.filterSubject.subscribe(filterValue => {
  //     const filteredData = data.filter(item => 
  //       !filterValue || item.level.toLowerCase().includes(filterValue.toLowerCase())
  //     );
  //     this.dataSubject.next(filteredData);
  //   });
  // }

  // set filter(filter: string) {
  //   this.filterSubject.next(filter);
  //   this.loadData();
  // }
}


/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

// function filterPredicate(params:type) {
  
// }

