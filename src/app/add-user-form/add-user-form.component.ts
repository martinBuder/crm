import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {

  newUser: any = {
    name: '',
    firstname:'',
    street: '',
    housenumber: '',
    postcode: '',
    city: '',
    phone:'',
    email:'',
    birthsday:'',
  };

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  logData(){
    this.newUser.birthsday =  (this.newUser.birthsday.getMonth() + 1) + "/" + this.newUser.birthsday.getDate() + "/" + this.newUser.birthsday.getFullYear();
    console.log(this.newUser);

  }

 
  onNoClick() {

  }
}
