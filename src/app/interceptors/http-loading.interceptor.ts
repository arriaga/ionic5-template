import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {LoadingController} from '@ionic/angular';
import {catchError, delay, finalize, map, retryWhen, switchMap, tap} from 'rxjs/operators';
import {StorageService} from '../services/storage.service';
import {Constants} from '../utils/constants';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {


    constructor(private loadingController: LoadingController , private storageService: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        this.loadingController.getTop().then(hasLoading => {
            if (!hasLoading) {

                this.loadingController.create({
                    spinner: 'circular',
                    translucent: true
                }).then(loading => loading.present());
            }
        });

        return from(this.storageService.getStorage(Constants.TOKEN_KEY)).pipe(
            switchMap(token => {
                req = this.addToken(req, token);
                return next.handle(req).pipe(
                    retryWhen(err => {
                        let retries = 1;
                        return err.pipe(
                            delay(1000),
                            map(error => {
                                if (retries++ === 2) {
                                    throw  error;
                                }
                                return error;
                            })
                        );
                    }),
                    catchError(err => {
                        console.log('err', err);
                        return throwError(err);
                    }),
                    finalize(() => {
                        this.loadingController.getTop().then(hasLoading => {
                            if (hasLoading) {
                                this.loadingController.dismiss();
                            }
                        });
                    })
                );
            })
        );


    }

    private addToken(req: HttpRequest<any>, token: any) {

        console.log('token', token.value);
        if (token.value) {

            let clone: HttpRequest<any>;
            clone = req.clone({
                setHeaders: {
                    Authorization: token
                }
            });

            return clone;
        }

        return req;

    }

}
