import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/service/authentication.service';
import { ErrorsHandler } from '../shared/common/errors-handler';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName = '';
  password = '';
  invalidLogin: boolean = false;
  loginPopupVisible: boolean = false;
  loadingVisible: boolean = true;
  
  constructor(private router: Router,
    private loginservice: AuthenticationService,private errorHandler: ErrorsHandler) { }

  ngOnInit() {

    this.showInfo();
  }

  showInfo(){
    this.loginPopupVisible = true;
    this.loadingVisible = false;
  }

  checkLogin() {
    this.loadingVisible = true;
    (this.loginservice.authenticateLogin(this.userName, this.password).subscribe(
      (data) => {
        this.loadingVisible = false;
        this.router.navigate(['/home']);
        this.invalidLogin = false;
      },
      (error) => {
        this.loadingVisible = false;
        this.invalidLogin = true;
        notify('User Invalid.', 'error', 4000);
        // this.errorHandler.handleError(error);
      }
    )
    );

  }

}
