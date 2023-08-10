import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';
import { DocumentData, DocumentReference, Firestore, Timestamp, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user : string = '';
  panelOpenState: boolean = false;
  user$ !: Observable<any>;
  usersCollection = collection(this.firestore, 'user$');
  birthsday!: any;

  constructor(public dialog: MatDialog, public firestore: Firestore) {
    this.getUsers();
  
  }

  /**
   * open the dialog window
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      data: {name: this.user},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
    });
  }

  /**
   * get users from firebase
   */
  getUsers() {
    this.user$ = collectionData(this.usersCollection, {idField : 'id'});
  }

 getBirthsday(timestamp: any):string {
  const seconds = timestamp.seconds;
  const nanoseconds = timestamp.nanoseconds;

  const milliseconds = seconds * 1000 + nanoseconds / 1000000; // Umrechnung in Millisekunden

  const date = new Date(milliseconds);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  }
  }
 



