import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register = {
    id: '',
    name: '',
    lastname: '',
    gender: '',
    age: '',
    email: '',
    password: ''
   }
  constructor(private router: Router, public loadingController: LoadingController) { }
  ngOnInit() { 
  }
  login(){
    this.Loading();
    this.router.navigateByUrl('/login');
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
