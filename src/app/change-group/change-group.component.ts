import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/model/student';
import { StudentManagementService } from '../shared/service/student-management.service';
import { ErrorsHandler } from '../shared/common/errors-handler';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-change-group',
  templateUrl: './change-group.component.html',
  styleUrls: ['./change-group.component.scss']
})
export class ChangeGroupComponent implements OnInit {

  loadingVisible: boolean = true;
  showStudentInformationDiv: boolean;
  itemVisible: boolean = false;
  showFilterRow: boolean;
  isFirstYear:boolean;
  showFeeReceiptNumber: boolean = false;
  showStudentEnrollmentNumber: boolean = false;

  currentFilter: any;
  userName: String;
  student: Student[];
  
  constructor(private studentService: StudentManagementService,
              private errorHandler: ErrorsHandler,
              private router: Router) {

          this.showFilterRow = true;
  }

  ngOnInit(): void {

    this.loadingVisible = false;
    this.showStudentInformationDiv = false;
  }
  
  fetchStudentInformation(){
   // console.log('in fetch student info method:' + this.userName);
    /* let studentUserName = data.value */;
    this.loadingVisible = true;
    this.studentService.fetchStudentList(this.userName).subscribe(
      (result) =>{
        this.student = result;

        this.student.forEach((value)=> {
          if(value.collegeYear ==1){
            this.showFeeReceiptNumber = true;
          }
          else{
            this.showStudentEnrollmentNumber = true;
          }
        });

        this.showStudentInformationDiv = true;
        this.loadingVisible = false;
      },
      (error) =>{
        this.loadingVisible = false;
        this.errorHandler.handleError(error);
        this.router.navigate(['/changeGroup']);
      });
  }

  updateGroupCode(singleStudentObj){
   // console.log('in updateGroupCode method:' + singleStudentObj.data);
    this.loadingVisible = true;
    this.studentService.updateGroupCode(singleStudentObj.data).subscribe(
      (result) =>{
        this.loadingVisible = false;
        this.showStudentInformationDiv = false;
        notify('User updated successfully','success',4000);
        this.router.navigate(['/changeGroup']);
        this.userName = null;
      },
      (error) =>{
        this.loadingVisible = false;
        this.errorHandler.handleError(error);
        notify('Some Error Occured','error',4000);
        this.router.navigate(['/changeGroup']);
      });
  }
}
