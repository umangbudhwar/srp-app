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
  studentPopupVisible: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.showInfo();
  }

  showInfo() {
    this.popupVisible = true;
    this.loadingVisible = false;
}
callFaculty() {
  this.popupVisible = false;
  this.facultyPopupVisible = true;
 
}
callStudent(){
  this.popupVisible = false;
  this.studentPopupVisible = true;
}
back(){
  this.studentPopupVisible =false;
  this.facultyPopupVisible = false;
  this.popupVisible = true;
}
}