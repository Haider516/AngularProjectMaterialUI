import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { Inject } from '@angular/core';
import { TableCrudService } from '../../service/table-crud.service';


@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatDialogTitle,
    ButtonComponent,
  ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})


export class DialogDeleteComponent {

  @Input() indexNumber!: number | string;

  //@Output() openDialog: EventEmitter<number | string> = new EventEmitter<number | string>();

  constructor(public dialog: MatDialog) { }

  openDialog() {
    console.log(this.indexNumber);
    this.dialog.open(DialogDeleteComponentdialog, {
      data: { indexNumber: this.indexNumber } // Optionally, pass data to the dialog if needed
    })
  }

}



@Component({
  standalone: true,
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-delete-content.html',
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatDialogTitle,
    ButtonComponent,
   
  ],


})
export class DialogDeleteComponentdialog {
  // @Input() indexNumber!: number | string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tableCrudService: TableCrudService,
    private ref: MatDialogRef<DialogDeleteComponentdialog>
  ) { }

  DeleteTableData() {
    const indexNumber = this.data.indexNumber;
    console.log('Deleting data at index:', indexNumber);
    this.tableCrudService.deleteData(indexNumber); // Call deleteData method from the service
    this.ref.close()
  }


}

