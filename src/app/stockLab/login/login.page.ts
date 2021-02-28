import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 usuario = {
  email: '',
  password: ''
 }
  constructor(private router: Router, public loadingController: LoadingController, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  register() {
    this.Loading();
    this.router.navigateByUrl('/register');
  }
  async Loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000,
      spinner: 'lines'
    });
    await loading.present();
  }
  submit(){
    console.log('a');
  }
  
}
