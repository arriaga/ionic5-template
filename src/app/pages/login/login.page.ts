import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { Plugins } from '@capacitor/core';
const { SignInWithApple, Device , FacebookLogin } = Plugins;
import { FacebookLoginResponse } from '@rdlabo/capacitor-facebook-login';
import '@codetrix-studio/capacitor-google-auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

  datos: any;

  // 788126292621-fjo2gi8klemoadk9lv28f6gkf13f4ss9.apps.googleusercontent.com
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.credentials =  this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required , Validators.email]],
      password: ['cityslicka' , [Validators.required , Validators.minLength(6)]]
    });
  }


  async login(){

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
      },
      async (res) => {

        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK']
        });
        alert.present();
      }
    );


  }

  async sigInApple(){

    const device = await Device.getInfo();

    if (device.platform === 'ios') {
      SignInWithApple.Authorize().then(response => {
        console.log('Exito Sig In', JSON.stringify(response));
      }).catch(response => {
        console.error('Error Sig In', JSON.stringify(response));
      });
    }

  }

  async sigInGoogle(){

    const device = await Device.getInfo();

    if (device.platform === 'android' || device.platform === 'ios' ) {

      const googleUser = await Plugins.GoogleAuth.signIn();

      console.log('11111');
      console.log(JSON.stringify(googleUser));
      console.log('asadsada');

    }

  }

  async sigFaceBook(){

    const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos', 'user_gender'];

    const result: FacebookLoginResponse  = await  FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });


    if (result.accessToken) {

      // Login successful.s
      console.log(`Facebook access tokens is ${JSON.stringify(result)}`);

      console.log('Asdasdsad');
      console.log(result.accessToken.token);
      this.authService.profileFacebook(result.accessToken.token).subscribe( (data: any) => {
        console.log(data);
        this.datos = data.picture.data.url;
      });
    } else {
      // Cancelled by user.
    }

  }

  async logout(){
    const result11 = await FacebookLogin.logout();

    console.log('logout', JSON.stringify(result11));

  }

  get email(){

    return this.credentials.get('email');
  }

  get password(){

    return this.credentials.get('password');
  }

}
