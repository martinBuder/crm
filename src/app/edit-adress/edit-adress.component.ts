import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc,} from '@angular/fire/firestore';


@Component({
  selector: 'app-edit-adress',
  templateUrl: './edit-adress.component.html',
  styleUrls: ['./edit-adress.component.scss']
})
export class EditAdressComponent {

  usersCollection = collection(this.firestore, 'user$');
  user: any = User;
  userId: string = '';
  loading: boolean = false;
  
  customFieldOrder = ['street', 'housenumber', 'postcode', 'city', 'email', 'phone'];


  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<EditAdressComponent> ){
   
    
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

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj).sort((a, b) => {
      const indexA = this.customFieldOrder.indexOf(a);
      const indexB = this.customFieldOrder.indexOf(b);
  
      if (indexA === -1) {
        return 1; // Move unknown keys to the end
      }
  
      if (indexB === -1) {
        return -1; // Move unknown keys to the end
      }
  
      return indexA - indexB;
    });
  }

 

}
