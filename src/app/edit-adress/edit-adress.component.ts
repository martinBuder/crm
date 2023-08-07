import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { EditPersonalComponent } from '../edit-personal/edit-personal.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-adress',
  templateUrl: './edit-adress.component.html',
  styleUrls: ['./edit-adress.component.scss']
})
export class EditAdressComponent {

  user: any = User;
  loading: boolean = false;
  



  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<EditAdressComponent> ){
    
  }

  async saveEditUser(){
    this.loading = true;


    this.dialogRef.close();
  }

 
  onNoClick() {
    this.dialogRef.close();
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

}
