import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {Constants} from '../utils/constants';
import {StorageService} from './storage.service';

const {Storage} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    token = '';

    constructor(private http: HttpClient, private  storageService: StorageService) {
        this.loadToken();
    }

    async loadToken() {

        const token = await this.storageService.getStorage(Constants.TOKEN_KEY);
        if (token && token.value) {
            console.log('det token: ', token.value);
            this.token = token.value;
            this.isAuthenticated.next(true);
        } else {
            this.isAuthenticated.next(false);
        }

    }

    login(credentials: { email, password }): Observable<any> {
        return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
            map((data: any) => data.token),
            switchMap(token => {
                return from(this.storageService.saveToStorage(Constants.TOKEN_KEY, token));
            }),
            tap(() => {
                this.isAuthenticated.next(true);
            })
        );
    }


    profileFacebook(accessToken: string) {
        return this.http.get(`https://graph.facebook.com/me?fields=name,email,picture.width(400).height(400)&access_token=${accessToken}`);
    }

    logout(): Promise<void> {
        this.isAuthenticated.next(false);
        return this.storageService.removeValueInStorage(Constants.TOKEN_KEY);

    }
}
