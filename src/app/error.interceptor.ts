import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let errorResponse: any = {
                message: "",
                type: ""
            }
            if (err && err.error) {
                if (err.error.errors) {
                    for (const errProp in err.error.errors) {
                        if (err.error.errors.hasOwnProperty(errProp) && err.error.errors[errProp][0]) {
                            errorResponse.message += err.error.errors[errProp];
                        }
                    }
                } else if (err.error) {
                    for (const errProp in err.error) {
                        if (err.error.hasOwnProperty(errProp) && err.error[errProp][0]) {
                            errorResponse.message += err.error[errProp];
                        }
                    }
                }
                errorResponse.type = 'danger'
            }
           
            return throwError(errorResponse);
        }))
    }
}