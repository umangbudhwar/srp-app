import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/model/student';
import { StudentManagementService } from '../shared/service/student-management.service';
import { ErrorsHandler } from '../shared/common/errors-handler';
import notify from 'devextreme/ui/notify';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  students: Student[];
  loadingVisible:boolean = true;
  showFilterRow: boolean;
  currentFilter: any;
  itemVisible: boolean = false;
  dateOfBirth: DatePipe;

  constructor(private studentService: StudentManagementService,
              private errorHandler: ErrorsHandler,private datePipe: DatePipe) { 

    this.showFilterRow = true;
  }

  ngOnInit(): void {

    this.getStudentsForReportGeneration();

  }

  getStudentsForReportGeneration()
  {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const facultyUserName = currentUser !== null? currentUser.userName : null;
   // console.log(facultyUserName);
    if(facultyUserName){

      this.studentService.getStudentForReportGeneration(facultyUserName).subscribe( response =>{
        response.forEach(element => {
          this.datePipe.transform(element.dateOfBirth,'yyyy-MM-dd');
        });
        this.students = response;
        this.loadingVisible = false;
      },
      (error) =>{
        this.loadingVisible = false;
        this.errorHandler.handleError(error);
       // console.log(error);
      });
    }
  }

  onEditingStart(e: boolean) {  
    this.itemVisible = true;  
  }

  /* updateStudent(student:Student): void {
    
    this.studentService.updateStudent(student)
    .subscribe( data => {
      this.getStudentsForReportGeneration();
      notify('User updated successfully','success',4000);
    },
    error =>{
      this.errorHandler.handleError(error);
      this.loadingVisible = false;
      notify('Some Error Occured','error',4000);
    });
  } */
}