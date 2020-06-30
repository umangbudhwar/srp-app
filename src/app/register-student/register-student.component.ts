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
  DxDateBoxModule,
  DxButtonModule,
  DxValidatorModule,
  DxValidationSummaryModule
} from 'devextreme-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../shared/service/authentication.service';
import { UserAuth } from '../shared/model/user-auth';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
})
export class RegisterStudentComponent implements OnInit {

  loadingVisible: boolean = true;
  studentPopupVisible: boolean = false;
  checkBoxDisabled: boolean = false;

  studentRegisterForm: FormGroup = new FormGroup({});

  streams: Streams[] = [];
  subjects: Subject[] = [];
  selectedSubjectId: number[] = [];
  selectedSubjects: Subject[] = [];
  subjectId: number[] = [];
  selectedStreamSubjects: Subject[];
  genderOptions: String[] = [];
  categoryOptions: String[] = [];

  selectedStreamId: number;
  collegeYear: number;
  calculateAge: number;
  limit: number;
  password: string = "";
  items: any;

  namePattern: RegExp = /^[^0-9]+$/;
  phonePattern: RegExp = /^[6-9]\d{9}$/;
  otp: number = 456789;
  userAuth: UserAuth = null;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentManagementService,
    private errorHandler: ErrorsHandler,
    private router: Router,
    private streamService: StreamService,
    private subjectService: SubjectService,
    public authenticationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.loadingVisible = false;
    this.userAuth = this.authenticationService.getAuthUser();

      this.streamService.getStreams().subscribe((data) => {
        this.streams = data;
      });
  
      this.subjectService.getSubjects().subscribe((data) => {
        this.subjects = data;
      });
  
      this.genderOptions = ["Male", "Female", "Transgender"];
      this.categoryOptions = ["General", "SC", "ST", "OBC", "Others"];
  
      this.studentRegisterForm = this.formBuilder.group(
        {
          userName: ['', [Validators.required], this.findIfUserNameExist.bind(this)],
          studentOTP: ['', [Validators.required]],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          whatsappNumber: ['', Validators.required],
          fatherName: ['', Validators.required],
          motherName: ['', Validators.required],
          guardianPhoneNumber: ['', Validators.required],
          emailId: ['', Validators.required],
          age: ['', Validators.required],
          dateOfBirth: ['', Validators.required],
          gender: ['', Validators.required],
          category: ['', Validators.required],
          alternatePhoneNumber: [''],
          collegeYear: ['', Validators.required],
          feeReceiptNumber: [''],
          enrollmentNumber: [''],
          groupDivision: [''],
          streamId: ['', Validators.required],
          subjectId: ['', Validators.required],
          studentCode: ['', Validators.required],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        }
      );
  }
  passwordComparison = () => {
    return this.password;
  };
  checkComparison() {
    return true;
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

  validateCheckBox($event) {
    let selectedSubjects: Subject[] = this.subjects.filter((subject) => subject.checked);
    this.collegeYear = this.studentRegisterForm.get('collegeYear').value;
    
    /* if (selectedSubjects.length == 0) {
      notify('Subject is required', 'error', 4000);
    } */ 
    if (this.selectedStreamId == 1 && (this.collegeYear == 1 || this.collegeYear == 2) && selectedSubjects.length > 2) {
     // $event.preventDefault();
      notify('You can only select 3 subjects', 'error', 4000);
      this.checkBoxDisabled = true;
     // $event.preventDefault();
    } 
    else if (this.selectedStreamId == 1 && this.collegeYear == 3 && selectedSubjects.length > 1) {
      //$event.preventDefault();
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

  findIfUserNameExist() {
    let username = this.studentRegisterForm.get('userName').value;
    return this.studentService.findIfUserNameExists(username).pipe(map(res => {
      let temp = res == true;
      if (res == true) {
        return { userNameExists: true };
      }
    }));
  }

  isFirstYear(): boolean {
    let collegeYearNumber = this.studentRegisterForm.get('collegeYear').value;
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
    this.calculateAge = moment().diff(dob, 'years');
  //  console.log(this.calculateAge);
  }

  submit($event) {
    let student: Student = this.studentRegisterForm.value;
    event.preventDefault();
    this.loadingVisible = true;
   // console.log('Student object:', student);

    let selectedSubjects: Subject[] = this.subjects.filter((subject) => subject.checked);
  //  console.log(selectedSubjects);

    selectedSubjects.forEach((value) => {
      this.selectedSubjectId.push(value.subjectId);
    });

    console.log(this.selectedSubjectId);
    student.subjectId = this.selectedSubjectId;

    this.streams.forEach((streamElement) => {
      this.selectedStreamId = streamElement.id;
    });

    
      this.studentService.registerStudent(student).subscribe(
        (data) => {
          notify('You have successflly registerted.', 'success', 4000);
          this.loadingVisible = false;
          this.items = '';
          this.studentRegisterForm.reset();
          this.studentPopupVisible = true;
        },
        (error) => {
          notify('Some Error Occured.', 'success', 4000);
          this.loadingVisible = false;
          this.errorHandler.handleError(error);
          this.router.navigate(['/registerStudent']);
          this.items = '';
          this.studentRegisterForm.reset();
        }
      );
  }
  reloadPage()
  {
    this.studentPopupVisible = false;
    this.studentRegisterForm.reset();
    this.items = '';
    this.studentRegisterForm.markAsUntouched();
  }
}
