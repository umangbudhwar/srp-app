import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuardService {
  
    constructor(private router: Router,
      private authService: AuthenticationService) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authService.getAuthUser())
        return true;
      else
      {
        this.router.navigate(['/']);
         return false;
      }
  
    }
  
  }