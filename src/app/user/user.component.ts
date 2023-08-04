import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';
import { DocumentData, DocumentReference, Firestore, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user : string = '';
  panelOpenState: boolean = false;
  user$ !: Observable<any>;
  usersCollection = collection(this.firestore, 'user$');

  constructor(public dialog: MatDialog, public firestore: Firestore) {
    this.getUsers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      data: {name: this.user},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
    });
  }

  getUsers() {
    this.user$ = collectionData(this.usersCollection, {idField : 'id'});
    
  }

  editUser(user:any){
    // const userDoc = doc(this.usersCollection, user.id)
    // updateDoc(userDoc, user)
    console.log(user);
    
  }

  deleteUser(id:string) {
    const userDoc = doc(this.usersCollection, id)
    deleteDoc(userDoc);

  }

}


