import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService  implements HttpInterceptor{

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const tokenId = currentUser !== null? currentUser.jwt : null;
    if(tokenId){
      const cloned = request.clone({
        headers: request.headers.set('Authorization','Bearer '+ tokenId)
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
