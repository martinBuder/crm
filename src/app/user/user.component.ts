import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  newUser : string = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      data: {name: this.newUser},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newUser = result;
    });
  }

}
