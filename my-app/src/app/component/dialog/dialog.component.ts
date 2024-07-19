import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { DataFormComponent } from '../data-form/data-form.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { TableCrudService } from '../../service/table-crud.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataTableItem } from '../../tableDataInterface';
import { MatDivider } from '@angular/material/divider';
import { DividerComponent } from '../divider/divider.component';


interface DataStructure {
  id?: number,
  name: string,
  amount: number,
}


@Component({
  standalone: true,
  selector: 'dialog-elements-example',
  templateUrl: 'dialog-elements-example.html',

  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatDialogTitle,
    ButtonComponent,
    DataFormComponent,

  ],
})

export class DialogElementsExample {

  @Input() indexNumber!: number;
  @Input() type!: string;
  @Input() text!: string;
  private obj!: DataStructure;

  constructor(public dialog: MatDialog,
    private tableCrudService: TableCrudService) {
    // this.obj = this.tableCrudService.getObject(this.indexNumber);//return an object 
  }

  // if(this.type === "UPDATE") {
  openDialog() {
    // debugger
    if (this.type === "UPDATE") {

      const obj = this.tableCrudService.getObject(this.indexNumber);
      console.log(obj);

      if (obj) {
        this.dialog.open(DialogElementsExampleDialog, {
          data: {
            indexNumber: this.indexNumber, obj,
            type: this.type,
          }
        });
      } else {
        console.error(`Object not found for index ${this.indexNumber}`);
      }
    }
    else {
      const obj = {
        name: "",
        amount: 0,
      }
      this.dialog.open(DialogElementsExampleDialog, {
        data: {
          indexNumber: this.indexNumber, obj,
          type: this.type,
        }
      });

    }
  }
}






@Component({
  standalone: true,
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.html',
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatDialogTitle,
    ButtonComponent,
    DataFormComponent,
    FormsModule,
    MatSelectModule, MatFormFieldModule,
    MatInputModule, ReactiveFormsModule, DividerComponent

  ],
  providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },],
})

// dialog content 
export class DialogElementsExampleDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tableCrudService: TableCrudService,
    private ref: MatDialogRef<DialogElementsExampleDialog>) {
    //  this.tableCrudService.getDataSource().subscribe((data: DataTableItem[]) => {
    // this.data = data;
  }


  model: DataStructure = {
    name: this.data.obj.name,
    amount: this.data.obj.amount,
  };


  submitForm(): void {
    // Ensure form is valid
    if (this.model.name && this.model.amount) {

      const formData: DataStructure = {
        name: this.model.name,
        amount: this.model.amount,
      };

      if (this.data.type === "UPDATE") {
        const updateData: DataTableItem = {
          id: this.data.obj.id,
          name: formData.name,
          amount: +formData.amount,
        }

        console.log('Form Data Submitted:', formData);
        console.log("updateData", updateData, this.data.indexNumber);
        this.tableCrudService.updateData(updateData, this.data.indexNumber);

      }
      else {
        const addedData = {
          name: formData.name,
          amount: +formData.amount,
        }
        //formData.id:33
        this.tableCrudService.addData(addedData);
      }

      this.ref.close()
    }
  }


}
