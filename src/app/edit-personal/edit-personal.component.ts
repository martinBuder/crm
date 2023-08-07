import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';



@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styleUrls: ['./edit-personal.component.scss']
})
export class EditPersonalComponent {

  user!: User;
  loading: boolean = false;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<EditPersonalComponent> ){
    
  }

  
  
  async saveEditUser(){
    this.loading = true;


    this.dialogRef.close();
  }

 
  onNoClick() {
    this.dialogRef.close();
  }
}
