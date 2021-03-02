import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from '../models/usuario';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarioo: Usuario;
 usuario = {
  email: '',
  password: ''
 }
  constructor(private loginService: LoginService,
              private router: Router, public loadingController: LoadingController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usuarioo = new Usuario;
  }
  register() {
    //this.Loading();
    //this.router.navigateByUrl('/register');
    this.loginService.logout();
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
    this.usuarioo.usuario = this.usuario.email;
    this.usuarioo.password = this.usuario.password;

    
    this.loginService.login(this.usuarioo).then((val) =>{
      val.subscribe(result =>{
        this.Loading();
        this.router.navigateByUrl('/dashboard');
      })
    })
  }
  
}
