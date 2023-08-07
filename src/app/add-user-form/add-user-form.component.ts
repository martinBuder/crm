import { Component, Input } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, deleteDoc, doc,} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {

  user = new User();
  usersCollection = collection(this.firestore, 'user$');
  loading: boolean = false;

  
 constructor(private firestore: Firestore, public dialogRef: MatDialogRef<AddUserFormComponent> ){}

 
  getObjectKeys(obj: any): string[] {
   return Object.keys(obj);
  }

  async saveUser(){
    this.loading = true;
    this.user.birthsday =  (this.user.birthsday.getMonth() + 1) + "/" + this.user.birthsday.getDate() + "/" + this.user.birthsday.getFullYear();

   await addDoc(this.usersCollection, this.user.toJSON()); 


    console.log(this.user);
    this.loading = false;

    this.dialogRef.close();
  }

 
  onNoClick() {
    this.dialogRef.close();
  }

  editUser(id:string){
    const userDoc = doc(this.usersCollection, id)
    changeDoc(userDoc)   
  }
}
function changeDoc(userDoc: DocumentReference<DocumentData>) {
  throw new Error('Function not implemented.');
}

