import { Component, OnInit } from '@angular/core';
import { Faculty } from '../shared/model/faculty';
import { FormBuilder, FormGroup, Validators,FormControl,AbstractControl } from '@angular/forms';
import notify from 'devextreme/ui/notify';
import { FacultyManagementServiceService } from '../shared/service/faculty-management-service.service';
import { ErrorsHandler } from '../shared/common/errors-handler';
import { Router } from '@angular/router';
import { Stream } from '../shared/model/streams';
import { StreamService } from '../shared/common/stream-service';

@Component({
  selector: 'app-register-faculty',
  templateUrl: './register-faculty.component.html',
  styleUrls: ['./register-faculty.component.scss']
})
export class RegisterFacultyComponent implements OnInit {

  facultyRegistrationPopupVisible: boolean = false;
  loadingVisible: boolean = true;
  checkoutForm: FormGroup = new FormGroup({});
  items: any;
  stream: Stream[];
  streamId: number;

  constructor(private formBuilder: FormBuilder, 
              private facultyService: FacultyManagementServiceService,
              private errorHandler: ErrorsHandler,
              private router: Router,
              private streamService: StreamService,) {

    }

  ngOnInit(): void {
    this.showInfo();

    this.streamService.getStreams().subscribe(data => {
      this.stream = data;
    });

    this.checkoutForm = this.formBuilder.group({
      emailId: [null,Validators.required],
      userName: [null,Validators.required], // userId
      firstName: [null,Validators.required],
      lastName: [null,Validators.required],
      contactNumber: [null,Validators.required],
      adminOTP: [null,Validators.required],
      streamId: [null, Validators.required],
      password: [null,Validators.required],
      confirmPassword: [null,Validators.required]
    },
    {validator:this.checkPasswords});
  }

  checkPasswords(formGroup: FormGroup){
    console.log('checkPasswords.')
    let password = formGroup.get('password').value;
    let confirmPassword = formGroup.get('confirmPassword').value;

    return password == confirmPassword ? null : {notSame: true};
  }

  showInfo() {
    this.facultyRegistrationPopupVisible = true;
    this.loadingVisible = false;
  }

  submit()
  {
    let faculty: Faculty = this.checkoutForm.value;
    console.log('registerFaculty called');

    this.stream.forEach ((streamElement) => {
      this.streamId = streamElement.id ;
    });

    this.facultyService.registerFaculty(faculty)
    .subscribe(data => {
      notify('Faculty added successfully','success',4000);
      this.router.navigate(['/login']);
    },
    error =>{
      this.errorHandler.handleError(error);
      console.log(error);
      this.loadingVisible = false;
      this.router.navigate(['/']);
    });
    
  };
}
