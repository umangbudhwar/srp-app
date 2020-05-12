import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  popupVisible: boolean = false;
  loadingVisible: boolean = true;
  facultyPopupVisible: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.showInfo();
  }

  showInfo() {
    this.popupVisible = true;
    this.loadingVisible = false;
}
callFaculty() {
  // console.log('Faculty login called');
  this.facultyPopupVisible = true;
 
}
/* callStudent() {
  console.log('Student login called');
  //this.studentPopupVisible = true;
  this.router.navigate(['/login']);
}
facultyRegistration(){
  console.log('facultyRegistration called');
  this.router.navigate(['/registerFaculty']);
  
}

facultyLogin(){
  console.log('facultyLogin called');
  //this.facultyLoginPopupVisible = true;
  this.router.navigate(['/login']);
} */
}