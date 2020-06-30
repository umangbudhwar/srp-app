import { Component, OnInit } from '@angular/core';
import { UserAuth } from '../shared/model/user-auth';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loadingVisible:boolean = true;
  userAuth: UserAuth = null;
  isFaculty:boolean = false;
  isStudent:boolean = false;
  showDiv:boolean = false;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadingVisible =false;
    this.userAuth = this.authenticationService.getAuthUser();

    if(this.userAuth!=null){
      this.checkProfile();
    }
  }
  checkProfile(){
      if (this.userAuth.role.toUpperCase().search('FACULTY') != -1){
        this.isFaculty = true;
      } 
      else if (this.userAuth.role.toUpperCase().search('STUDENT') != -1){
        this.isStudent = true;
      }
      this.showDiv = true;
  }

}
