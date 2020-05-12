import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  studentRegistrationPopupVisible: boolean = false;
  loadingVisible: boolean = true;

  constructor() { }

  ngOnInit(): void {

    this.showInfo();
  }

  showInfo()
  {
    this.studentRegistrationPopupVisible = true;
    this.loadingVisible = false;
  }

}
