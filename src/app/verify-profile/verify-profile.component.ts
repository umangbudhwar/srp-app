import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { FacultyManagementServiceService } from '../shared/service/faculty-management-service.service';
import { ErrorsHandler } from '../shared/common/errors-handler';
import { Router } from '@angular/router';
import { Student } from '../shared/model/student';
import notify from 'devextreme/ui/notify';
import { StudentManagementService } from '../shared/service/student-management.service';
import { Subject } from '../shared/model/subject';
import { StreamService } from '../shared/common/stream-service';
import { SubjectService } from '../shared/common/subject-service';
import { Streams } from '../shared/model/streams';
import * as moment from 'moment';
import {
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxButtonModule,
  DxValidatorModule,
  DxValidationSummaryModule
} from 'devextreme-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuth } from '../shared/model/user-auth';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
  selector: 'app-verify-profile',
  templateUrl: './verify-profile.component.html',
  styleUrls: ['./verify-profile.component.scss']
})
export class VerifyProfileComponent implements OnInit {

  student:Student = null;
  user:UserAuth = null;
  selectedStreamId: number;
  collegeYear: number;
  calculateAge: number;
  limit: number;
  password: string = "";
  items: any;

  loadingVisible:boolean = true;
  studentVerified:boolean = false;
  editable:boolean = true;
  checkBoxDisabled:boolean = false;

  streams: Streams[] = [];
  subjects: Subject[] = [];
  selectedSubjectId: number[] = [];
  selectedSubjects: Subject[] = [];
  subjectId: number[] = [];
  selectedStreamSubjects: Subject[] =[];
  genderOptions: String[] = [];
  categoryOptions: String[] = [];

  studentRegisterForm: FormGroup = new FormGroup({});

  namePattern: RegExp = /^[^0-9]+$/;
  phonePattern: RegExp = /^[6-9]\d{9}$/;
  otp:number = 456789;

  constructor(private studentService: StudentManagementService,
    private errorHandler: ErrorsHandler,
    private router: Router,
    private streamService: StreamService,
    private subjectService: SubjectService,
    public authUser: AuthenticationService,
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
    this.user = this.authUser.getAuthUser();
   /*  if(this.student != null) {
      this.isVerified();
    } */

    this.streamService.getStreams().subscribe((data) => {
      this.streams = data;
    });

    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });

    if(this.subjects!=null) {
      this.loadStudentInfo(this.user.userName);
    }

    this.genderOptions = ["Male", "Female", "Transgender"];
    this.categoryOptions = ["General", "SC", "ST", "OBC", "Others"];

  //  this.loadingVisible = false;
  }
  autoPopulateSubjects(){

    let temp: number[] = this.student.subjectId;
    let selectedStreamId = this.student.streamId;
    this.selectedStreamSubjects = this.subjects.filter((subject) => subject.streamId == selectedStreamId);

    this.selectedStreamSubjects.forEach((subject) =>{
      temp.forEach((subjectId) => {
        if(subjectId == subject.subjectId )
              subject.checked = true;
      });
    }); 
  }
  loadStudentInfo(userName:String){
    this.loadingVisible = true;
    this.studentService.fetchStudentForVerification(userName).subscribe(
      (data) => { this.student = data;
      console.log(this.student);
      this.isVerified();
      this.autoPopulateSubjects();
      this.loadingVisible = false;});
  }
  isVerified(){
    if(this.student.verified == true)
      this.studentVerified = true;
    else
      this.studentVerified = false;
  }

  isFirstYear(): boolean {
    // let collegeYearNumber = this.studentRegisterForm.get('collegeYear').value;
    let collegeYearNumber = this.student.collegeYear;
    return collegeYearNumber == 1;
  }

  onStreamSelectChange(e) {
    this.selectedStreamId = e.value;
    if (e.previousValue != null) {
      this.selectedStreamSubjects = this.getSubjectByStream(this.selectedStreamId);
    }
  }

  getSubjectByStream(streamId: number): Subject[] {
    return this.subjects.filter((subject) => subject.streamId == streamId);
  }
  ageFromDateOfBirthday(e) {

    let dob = this.studentRegisterForm.get('dateOfBirth').value;
   // console.log(dob + ' ' + e.value);
    this.student.age = moment().diff(dob, 'years');
  //  console.log(this.calculateAge);
  }

  validateCheckBox($event) {
    let selectedSubjects: Subject[] = this.subjects.filter((subject) => subject.checked);
    this.collegeYear = this.studentRegisterForm.get('collegeYear').value;
    
    /* if (selectedSubjects.length == 0) {
      notify('Subject is required', 'error', 4000);
    } */ 
    if (this.selectedStreamId == 1 && (this.collegeYear == 1 || this.collegeYear == 2) && selectedSubjects.length > 2) {
      $event.preventDefault();
      notify('You can only select 3 subjects', 'error', 4000);
      this.checkBoxDisabled = true;
     // $event.preventDefault();
    } 
    else if (this.selectedStreamId == 1 && this.collegeYear == 3 && selectedSubjects.length > 1) {
      $event.preventDefault();
      notify('You can only select 2 subjects', 'error', 4000);
      this.checkBoxDisabled = true;
     // $event.preventDefault();
    }
    else if (this.selectedStreamId == 1 && (this.collegeYear == 1 || this.collegeYear == 2) && selectedSubjects.length < 3) {
      notify('You need to select 3 subjects', 'info', 4000);
    } 
    else if (this.selectedStreamId == 1 && this.collegeYear == 3 && selectedSubjects.length < 2) {
      notify('You need to select 2 subjects', 'info', 4000);
    }
  }

  submit($event){
    event.preventDefault();
    this.loadingVisible = true;

    let selectedSubjects: Subject[] = this.subjects.filter((subject) => subject.checked);

    selectedSubjects.forEach((value) => {
      this.selectedSubjectId.push(value.subjectId);
    });

   // console.log(this.selectedSubjectId);
    this.student.subjectId = this.selectedSubjectId;

    this.streams.forEach((streamElement) => {
      this.selectedStreamId = streamElement.id;
    });
    
  //  console.log(this.student)
    this.studentService.registerStudent(this.student).subscribe(
      (data) => {
        notify('You have successflly verified your profile.', 'success', 4000);
        this.loadingVisible = false;
        this.router.navigate(['/home']);
      },
      (error) => {
        this.loadingVisible = false;
        notify('Some Error Occurred.', 'error', 4000);
        this.errorHandler.handleError(error);
        this.router.navigate(['/home']);
      }
    );

  }
  editProfile($event){
    this.editable = false;
  }
}
