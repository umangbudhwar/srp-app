import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const tokenId = currentUser !== null? currentUser.jwt : null;

    if (currentUser && tokenId) {
      req = req.clone({
        setHeaders: {
          Authorization: tokenId
        }
      })
    }

    return next.handle(req);

  }
}
