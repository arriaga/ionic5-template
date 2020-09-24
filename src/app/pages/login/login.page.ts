import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {

    this.credentials =  this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required , Validators.email]],
      password: ['cityslicka' , [Validators.required , Validators.minLength(6)]]
    });
  }


  async login(){

    this.authService.login(this.credentials.value).subscribe(
       (res) => {
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
      },
      async (res) => {

        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK']
        });
        await alert.present();
      }
    );


  }
  get email(){

    return this.credentials.get('email');
  }

  get password(){

    return this.credentials.get('password');
  }

}
