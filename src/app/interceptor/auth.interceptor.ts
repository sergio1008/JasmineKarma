import { Injectable } from '@angular/core';
import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const ADD_AUTHORIZATION_TOKEN = new HttpContextToken(() => true);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = 'este es el token';

        const retryCount = req.context.get(ADD_AUTHORIZATION_TOKEN);
        if(retryCount){
            if (!token) {
                return next.handle(req);
            }
            const headers = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(headers);
        }else {
            return next.handle(req);
        }
    }
}