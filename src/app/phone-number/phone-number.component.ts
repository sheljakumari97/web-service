import { Component, OnInit, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

var config={
  apiKey: 'AIzaSyBAJICL9s0BadjIYE0f6OCuKjJKCFRLInc',
    authDomain: 'phone-auth-9c3e3.firebaseapp.com',
    projectId: 'phone-auth-9c3e3',
    storageBucket: 'phone-auth-9c3e3.appspot.com',
    messagingSenderId: '255150664883',
    appId: '1:255150664883:web:ef8f193e6a3262ab92d4c6',
}

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css'],
})
export class PhoneNumberComponent implements OnInit {
  phoneNumber: any;
  reCaptchaVerifier!: any;
  password!: any;

  constructor(private router: Router, private ngZone: NgZone) {}

  ngOnInit() {
    firebase.initializeApp(config) 
   /** this.loginForm = this.formBuilder.group({
      phoneNumber:[''],
      password:['']
    })**/
    
  }
  

/**signIn(){
  this.http.post<any>(this.loginForm.value)
  .subscribe({
    next: res=>{
    alert("Login successfully");
    this.loginForm.reset();
    this.router.navigate(['code']);
  },error: ()=>{
    alert("Something went wrong");
  }
  })
}**/

  getOTP() {
    this.password = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      }
    );
    console.log(this.password);

    console.log(this.phoneNumber);
    firebase
      .auth()
      .signInWithPhoneNumber(this.phoneNumber, this.password)
      .then((confirmationResult: { verificationId: any; }) => {
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        this.ngZone.run(() => {
          this.router.navigate(['/code']);
        });
      })
      .catch((error: { message: any; }) => {
        console.log(error.message);
        alert(error.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  }
}