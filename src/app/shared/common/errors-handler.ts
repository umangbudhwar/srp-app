import { Injectable, ErrorHandler, Injector } from "@angular/core";
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHandler implements ErrorHandler{
    
    constructor(private injector: Injector){}
    handleError(error: Error) {
        if (error instanceof HttpErrorResponse){
          
          //server error occured
          if(!navigator.onLine){
              // handle offline error
              // console.log(error);
              notify('No Internet Connection','error',4000);
          }
          else{
            console.log(error);
            notify(error.error.message,'error',4000);
            if(!error.error.message){
              const router = this.injector.get(Router);
              notify('Session Expired or Services not available. Please contact ssupport team.','error',4000);
              sessionStorage.removeItem('currentUser');
              router.navigate(['/logout']);
            }
            // handle http error
          }
        }
        else{
          // handle client error
          // console.log(error);
          notify(error.message,'error',4000);
        }
        //log the error anyway
        // console.log(error);
      }
    
}