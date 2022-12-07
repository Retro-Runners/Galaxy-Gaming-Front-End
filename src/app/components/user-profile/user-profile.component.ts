import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Address } from 'src/app/models/address';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() user: Address ={
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  };
  editProfileForm: FormGroup;
  text:String = "";
  fields:String[] = [""];
  constructor(private fb:FormBuilder, private Auth: AuthService) {
    this.editProfileForm = fb.group({
      firstName:[''],
      lastName:[''],
      address1:[''],
      address2:[''],
      city:[''],
      state:[''],
      zip:[''],
      country:['']
    });
   }

  ngOnInit(): void {
    this.Auth.getAddress().subscribe(
      address => {
        this.text = address.password;
        console.log(this.text)
        if(this.text != null){
        this.fields = this.text.split("/",8)
      } else{
        this.fields = ["","","","","","","",""]
      }
        console.log(this.fields);
        this.user = {
          firstName: this.fields[0].toString(),
          lastName:this.fields[1].toString(),
          address1:this.fields[2].toString(),
          address2:this.fields[3].toString(),
          city:this.fields[4].toString(),
          state:this.fields[5].toString(),
          zip:this.fields[6].toString(),
          country:this.fields[7].toString()
        }
      }
  
    );
  } 

getEditProfileForm(){
  return this.editProfileForm.controls;
}

saveChanges(): void {
  if(this.user) {
    let address:string = this.user.firstName + '/' + this.user.lastName + '/' + this.user.address1 + '/' + 
    this.user.address2 + '/' + this.user.city + '/' + this.user.state + '/' +
    this.user.zip + '/' + this.user.country; 
    this.Auth.saveUser(address).subscribe();
  }
}

}
