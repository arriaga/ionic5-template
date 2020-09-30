import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpRequestInterceptor} from './interceptors/http-loading.interceptor';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import '@codetrix-studio/capacitor-google-auth';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
