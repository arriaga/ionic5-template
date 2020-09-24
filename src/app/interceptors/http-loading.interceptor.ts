import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {LoadingController} from '@ionic/angular';
import {catchError, delay, finalize, map, retryWhen, tap} from 'rxjs/operators';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {


    constructor(private loadingController: LoadingController) {
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

        return next.handle(req).pipe(
            retryWhen(err => {
                let retries = 1;
                return err.pipe(
                    delay(1000),
                    map(error => {
                        if (retries++ === 3) {
                            throw  error;
                        }
                        return error;
                    }),
                    tap(() => {
                    })
                );
            }),
            catchError(err => {
                console.log('err', err);
                return EMPTY;
            }),
            finalize(() => {
                this.loadingController.getTop().then(hasLoading => {
                    if (hasLoading) {
                        this.loadingController.dismiss();
                    }
                });
            })
        );

    }

}
