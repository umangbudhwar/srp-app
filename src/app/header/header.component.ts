import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/service/authentication.service';
import { Router } from '@angular/router';
import { ThemeService } from '../shared/service/theme.service';
import { UserAuth } from '../shared/model/user-auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDarkTheme: Observable<boolean>;
  userName: String = null;
  userAuth: UserAuth = null;
  showDiv:boolean = false;
  
  constructor(private themeService: ThemeService,public authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {

    this.isDarkTheme = this.themeService.isDarkTheme;
    this.userAuth = this.authenticationService.getAuthUser();

    if(this.userAuth!=null){
      this.showDiv = true;
      this.isFaculty();
    }
  }
  isFaculty():boolean{
    if (this.userAuth.role.toUpperCase().search('FACULTY') == -1)
    {
      return false;
    }
    else{
      return true;
    }
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }

}
