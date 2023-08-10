import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';



@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styleUrls: ['./edit-personal.component.scss']
})
export class EditPersonalComponent {

  usersCollection = collection(this.firestore, 'user$');
  user: any = User;
  userId: string = '';
  loading: boolean = false;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<EditPersonalComponent> ){
  
    console.log(this.user);
    
  }

  
  
  async saveEditUser(){
    this.loading = true;
    const userDoc = doc(this.usersCollection, this.userId)
    await updateDoc(userDoc, this.user.toJSON());
      // Manuell die this.user-Variable aktualisieren
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        this.user = userSnapshot.data();
      }
    this.dialogRef.close();
  }

 
  onNoClick():void {
    this.dialogRef.close();
  }
}
