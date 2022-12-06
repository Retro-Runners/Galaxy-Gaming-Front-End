import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() user?: Address
  editProfileForm: FormGroup;

  constructor(private fb:FormBuilder, private Auth: AuthService) {
    this.editProfileForm = fb.group({
      firstName:[''],
      lastName:[''],
      address1:[''],
      address2:[''],
      city:[''],
      state:[''],
      zipCode:[''],
      country:['']
    });
   }

  ngOnInit(): void {
    this.user = {
      firstName:'',
      lastName:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
      zip:'',
      country:''
    }
  }

getEditProfileForm(){
  return this.editProfileForm.controls;
}

saveChanges(): void {
  if(this.user) {
    let address:string = this.user.firstName + '/' + this.user.lastName + '/' + this.user.address1 + '/' + 
    this.user.address2 + '/' + this.user.city + '/' + this.user.state +
    this.user.zip + '/' + this.user.country; 

    this.Auth.saveUser(address).subscribe();
  }
}

}
