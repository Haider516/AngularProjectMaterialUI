// import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { map } from 'rxjs/operators';
// import { Observable, of as observableOf, merge } from 'rxjs';
// import { DataTableItem } from '../../tableDataInterface';
// import { TableCrudService } from '../../service/table-crud.service';

// // TODO: Replace this with your own data model type
// // export interface DataTableItem {
// //   name: string;
// //   id: number;
// //   amount:number;
// // }

// // TODO: replace this with real data from your application
// // const EXAMPLE_DATA: DataTableItem[] = [
// //   {id: 1, name: 'Hydrogen' ,amount:1001010},
// //   {id: 2, name: 'Helium' ,amount:1001010},
// //   {id: 3, name: 'Lithium' ,amount:1001010},
// //   {id: 4, name: 'Beryllium' ,amount:1001010},
// //   {id: 5, name: 'Boron' ,amount:1001010},
// //   {id: 6, name: 'Carbon' ,amount:1001010},
// //   {id: 7, name: 'Nitrogen' ,amount:1001010},
// //   {id: 8, name: 'Oxygen' ,amount:1001010},
// //   {id: 9, name: 'Fluorine' ,amount:1001010},
// //   {id: 10, name: 'Neon' ,amount:1001010},
// //   {id: 11, name: 'Sodium' ,amount:1001010},
// //   {id: 12, name: 'Magnesium' ,amount:1001010},
// //   {id: 13, name: 'Aluminum' ,amount:1001010},
// //   {id: 14, name: 'Silicon' ,amount:1001010},
// //   {id: 15, name: 'Phosphorus' ,amount:1001010},
// //   {id: 16, name: 'Sulfur' ,amount:1001010},
// //   {id: 17, name: 'Chlorine' ,amount:1001010},
// //   {id: 18, name: 'Argon' ,amount:1001010},
// //   {id: 19, name: 'Potassium' ,amount:1001010},
// //   {id: 20, name: 'Calcium' ,amount:1001010},
// // ];

// /**
//  * Data source for the DataTable view. This class should
//  * encapsulate all logic for fetching and manipulating the displayed data
//  * (including sorting, pagination, and filtering).
//  */
// export class DataTableDataSource {

//   data: DataTableItem[] = [];
//   paginator: MatPaginator | undefined;
//   sort: MatSort | undefined;

//   constructor(private DataTableService: TableCrudService) {
//     // super();
//   }

//   ngOnInit(): void {

//     this.data = this.DataTableService.getDataSource()
//     console.log(this.data);

//   }
//   /**
//    * Connect this data source to the table. The table will only update when
//    * the returned stream emits new items.
//    * @returns A stream of the items to be rendered.
//    */
//   connect(): Observable<DataTableItem[]> {
//     if (this.paginator && this.sort) {
//       // Combine everything that affects the rendered data into one update
//       // stream for the data-table to consume.
//       return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
//         .pipe(map(() => {
//           return this.getPagedData(this.getSortedData([...this.data]));
//         }));
//     } else {
//       throw Error('Please set the paginator and sort on the data source before connecting.');
//     }
//   }

//   /**
//    *  Called when the table is being destroyed. Use this function, to clean up
//    * any open connections or free any held resources that were set up during connect.
//    */
//   disconnect(): void { }

//   /**
//    * Paginate the data (client-side). If you're using server-side pagination,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getPagedData(data: DataTableItem[]): DataTableItem[] {
//     if (this.paginator) {
//       const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//       return data.splice(startIndex, this.paginator.pageSize);
//     } else {
//       return data;
//     }
//   }

//   /**
//    * Sort the data (client-side). If you're using server-side sorting,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getSortedData(data: DataTableItem[]): DataTableItem[] {
//     if (!this.sort || !this.sort.active || this.sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       const isAsc = this.sort?.direction === 'asc';
//       switch (this.sort?.active) {
//         case 'name': return compare(a.name, b.name, isAsc);
//         case 'id': return compare(+a.id, +b.id, isAsc);
//         case 'amount': return compare(+a.amount, +b.amount, isAsc);
//         default: return 0;
//       }
//     });
//   }
// }

// /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a: string | number, b: string | number, isAsc: boolean): number {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
