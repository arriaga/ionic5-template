import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const {Storage}  = Plugins;
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map , switchMap , tap } from 'rxjs/operators';

const TOKEN_KEY =  'my-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor( private http: HttpClient) {
    this.loadToken();
   }

   async loadToken(){

    const token =  await Storage.get({key: TOKEN_KEY});
    if (token && token.value){
      console.log('det token: ' , token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    }else {
      this.isAuthenticated.next(false);
    }

   }

   login(credentials: { email , password}): Observable<any> {
    return this.http.post(`https://reqres.in/api/login` , credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => {
          return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      tap(() => {
        this.isAuthenticated.next(true);
      })
    );
   }


    profileFacebook(accessToken: string) {
        return this.http.get(`https://graph.facebook.com/me?fields=name,email,picture.width(400).height(400)&access_token=${accessToken}`);
    }

   logout(): Promise<void>{
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});

   }
}
