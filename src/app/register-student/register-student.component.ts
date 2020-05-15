import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
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
import { Stream } from '../shared/model/streams';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
})
export class RegisterStudentComponent implements OnInit {
  //studentRegistrationPopupVisible: boolean = false;
  loadingVisible: boolean = true;
  studentRegisterForm: FormGroup = new FormGroup({});
  items: any;
  stream: Stream[];
  subjects: Subject[];
  subjectId: number[];
  streamId: number;
  collegeYear: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentManagementService,
    private errorHandler: ErrorsHandler,
    private router: Router,
    private streamService: StreamService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.loadingVisible = false;

    this.streamService.getStreams().subscribe((data) => {
      this.stream = data;
    });

   /*  this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
    }); */

    this.studentRegisterForm = this.formBuilder.group(
      {
        userName: [null, Validators.required],
        studentOTP: [null, Validators.required],
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        whatsappNumber: [null, Validators.required],
        fatherName: [null, Validators.required],
        motherName: [null, Validators.required],
        guardianPhoneNumber: [null, Validators.required],
        emailId: [null, Validators.required],
        age: [null, Validators.required],
        DOB: [null, Validators.required],
        gender: [null, Validators.required],
        category: [null, Validators.required],
        alternatePhoneNumber: [null],
        collegeYear: [null, Validators.required],
        feeReceiptNumber: [null],
        enrollmentNumber: [null],
        groupDivision: [null],
        streamId: [null, Validators.required],
        subjectId: [null, Validators.required],
        studentCode: [null, Validators.required],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(formGroup: FormGroup) {
    console.log('checkPasswords.');
    let password = formGroup.get('password').value;
    let confirmPassword = formGroup.get('confirmPassword').value;

    return password == confirmPassword ? null : { notSame: true };
  }

  isFirstYear(): boolean {
    let collegeYearNumber = this.studentRegisterForm.get('collegeYear').value;
    return collegeYearNumber == 1;
  }

  getSubjectByStream(streamId:number):Subject[]{

    return this.subjects.filter((subject)=>subject.streamId==streamId);

  }
  submit($event) {
    let student: Student = this.studentRegisterForm.value;
    $event.preventDefault();
    console.log('Student object:', student);

    const selectedSubjects = this.subjects.filter((subject) => subject.checked);
    console.log(selectedSubjects);
    selectedSubjects.forEach((subjectElement) => {
      this.subjectId.push(subjectElement.subjecId);
    });

    this.stream.forEach((streamElement) => {
      this.streamId = streamElement.id;
    });

    this.studentService.registerStudent(student).subscribe(
      (data) => {
        notify('You have successflly registerted.', 'success', 4000);
        //this.items = '';
        //this.checkoutForm.reset();
        this.router.navigate(['/registerStudent']);
        this.items = '';
        this.studentRegisterForm.reset();
      },
      (error) => {
        this.errorHandler.handleError(error);
        console.log(error);
        this.loadingVisible = false;
        this.router.navigate(['/registerStudent']);
        this.items = '';
        this.studentRegisterForm.reset();
      }
    );
  }
}
