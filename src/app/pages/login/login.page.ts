import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { Plugins } from '@capacitor/core';
const { SignInWithApple, Device } = Plugins;
import '@codetrix-studio/capacitor-google-auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

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
    const loading = await this.loadingController.create();
    await  loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
      },
      async (res) => {

        await loading.dismiss();
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

      console.log("11111");
      console.log(JSON.stringify(googleUser));
      console.log("asadsada");

    }

  }

  get email(){

    return this.credentials.get('email');
  }

  get password(){

    return this.credentials.get('password');
  }

}
