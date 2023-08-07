import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { EditAdressComponent } from '../edit-adress/edit-adress.component';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonalComponent } from '../edit-personal/edit-personal.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  usersCollection = collection(this.firestore, 'user$');
  userId : any = '';
  user : any = User;

  constructor(private route: ActivatedRoute, 
    public firestore: Firestore,
    public dialog: MatDialog,) { }

  ngOnInit():void {
    this.route.paramMap.subscribe ( paramMap => {
      this.userId = paramMap.get('id');
      this.getUser();
    })
  }

  async getUser() {
    const userDoc = doc(this.usersCollection, this.userId)
    const userData = await getDoc(userDoc);
    this.user = userData.data()
    console.log(this.user);
    
  }

  openEditAdress(): void {
    const dialogRef = this.dialog.open(EditAdressComponent, {
      data: {name: this.user},
    });
    dialogRef.componentInstance.user = this.user;
    

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
    });
  }

  openEditPersonal(): void {
    const dialogRef = this.dialog.open(EditPersonalComponent, {
      data: {name: this.user},
    });
  
    dialogRef.componentInstance.user = this.user;

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
    });
  }
  
   /**
   * overwrite user in firebase
   * 
   * @param user array
   */
   editUser(user:any){
    // const userDoc = doc(this.usersCollection, user.id)
    // updateDoc(userDoc, user)
    console.log(user);
  }

  /**
   * delete User from firebase
   * 
   * @param id 
   */
  deleteUser(id:string) {
    const userDoc = doc(this.usersCollection, id)
    deleteDoc(userDoc);
  }
}
