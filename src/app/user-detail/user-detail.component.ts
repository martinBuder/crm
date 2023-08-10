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
    public dialog: MatDialog,) {}

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
  }

  /**
   * open edit adress and after closed get new datas
   */
  openEditAdress(): void {
    const dialogRef = this.dialog.open(EditAdressComponent, {
      data: {name: this.user},
    });
    dialogRef.componentInstance.user = new User(this.user);
    dialogRef.componentInstance.userId = this.userId;
    
    dialogRef.afterClosed().subscribe(async () => {
      await this.getUser();
    });  
  }

  openEditPersonal(): void {
    const dialogRef = this.dialog.open(EditPersonalComponent, {
      data: {name: this.user},
    });
    dialogRef.componentInstance.user = new User(this.user);
    dialogRef.componentInstance.userId = this.userId;
    
    dialogRef.afterClosed().subscribe(async () => {
      await this.getUser();
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
    const userDoc = doc(this.usersCollection, this.userId)
    deleteDoc(userDoc);
  }

  getBirthsday(timestamp: any):string {
    const seconds = timestamp?.seconds;
    const nanoseconds = timestamp?.nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000; // Umrechnung in Millisekunden
    const date = new Date(milliseconds);
      return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  }

}
