import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataTableItem } from '../tableDataInterface';

@Injectable({
  providedIn: 'root'
})

// interface DataStructure {
//   id?: number,
//   name: string,
//   amount: number
// }


export class TableCrudService {
 
  private data: DataTableItem[] = [
    { id: 1, name: 'Hydrogen', amount: 1001010 },
    { id: 2, name: 'Helium', amount: 2001010 },
    { id: 3, name: 'Lithium', amount: 3001010 },
    { id: 4, name: 'Beryllium', amount: 3001010 },
    { id: 5, name: 'Boron', amount: 4001010 },
    { id: 6, name: 'Carbon', amount: 5001010 },
    { id: 7, name: 'Nitrogen', amount: 6001010 },
    { id: 8, name: 'Oxygen', amount: 7001010 },
    { id: 9, name: 'Fluorine', amount: 8001010 },
    { id: 10, name: 'Neon', amount: 9001010 },
    { id: 11, name: 'Sodium', amount: 1101010 },
    { id: 12, name: 'Magnesium', amount: 1201010 },
    { id: 13, name: 'Aluminum', amount: 1301010 },
    { id: 14, name: 'Silicon', amount: 1401010 },
    { id: 15, name: 'Phosphorus', amount: 1501010 },
    { id: 16, name: 'Sulfur', amount: 1601010 },
    { id: 17, name: 'Chlorine', amount: 1701010 },
    { id: 18, name: 'Argon', amount: 1801010 },
    { id: 19, name: 'Potassium', amount: 1901010 },
    { id: 20, name: 'Calcium', amount: 2201010 },
  ];


  
  private dataSubject: BehaviorSubject<DataTableItem[]>; // BehaviorSubject for reactive updates
  private lengthID:number= 20;

  constructor() {
    this.dataSubject = new BehaviorSubject<DataTableItem[]>(this.data);
  }

  
  // Get the observable of the current data
  getDataSource(): Observable<DataTableItem[]> {
    return this.dataSubject.asObservable();
  }
  //finding index on the  basis of  id 
  findIndexValue(value: number): number {
    return this.data.findIndex(item => item.id === value);
  }

  // Delete data based on index
  deleteData(dataID: number): void {
    console.log(dataID);
    let objectIndex = this.findIndexValue(dataID)
    this.data.splice(objectIndex, 1);
    console.log(this.data);
    this.dataSubject.next(this.data);

  }



  //updateData

  // Retrieve the object based on Index
  getObject(receievedData: number): any {
    return this.data.find(item => item.id === receievedData);
  }

  // Update data based on index
  updateData(updateData: DataTableItem, index: number) {
    console.log(index);

    this.data[index - 1] = updateData;
    this.dataSubject.next([...this.data]);
    console.log("update:array", this.data);

  }


  //To Add DAta
  addData(formData: any) {
    console.log('updateData', formData);
    this.lengthID += 1;
    const model: DataTableItem = {
      id: this.lengthID ,
      ...formData
    }
    this.data.push(model)
    console.log('data', this.data);

    this.dataSubject.next([...this.data]);
    //debugger
  }
}
