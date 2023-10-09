import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,Validators,FormArray} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get email() {
    return this.credentials.controls.email;
  }

  get password() {
    return this.credentials.controls.password;
  }
  
  async login() {
    console.log(this.credentials.value);
  }
}
