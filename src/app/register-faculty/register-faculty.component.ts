import { Component, OnInit } from '@angular/core';
import { Faculty } from '../shared/model/faculty';
import { FormBuilder, FormGroup, Validators,FormControl,AbstractControl } from '@angular/forms';
import notify from 'devextreme/ui/notify';
import { FacultyManagementServiceService } from '../shared/service/faculty-management-service.service';
import { ErrorsHandler } from '../shared/common/errors-handler';
import { Router } from '@angular/router';
import { Streams } from '../shared/model/streams';
import { StreamService } from '../shared/common/stream-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register-faculty',
  templateUrl: './register-faculty.component.html',
  styleUrls: ['./register-faculty.component.scss']
})
export class RegisterFacultyComponent implements OnInit {

  facultyRegistrationPopupVisible: boolean = false;
  loadingVisible: boolean = true;

  checkoutForm: FormGroup = new FormGroup({});
  stream: Streams[];

  items: any;
  streamId: number;
  password: string = "";

  namePattern: RegExp = /^[^0-9]+$/;
  phonePattern: RegExp = /^[6-9]\d{9}$/;

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
      emailId: ['',Validators.required],
     userName: ['', [Validators.required], this.findIfUserNameExist.bind(this)], // userId
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      contactNumber: ['',Validators.required],
      adminOTP: ['',Validators.required],
      streamId: ['', Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    });
  }

  passwordComparison = () => {
    return this.password;
  };
  checkComparison() {
    return true;
  }

  findIfUserNameExist() {
    let username = this.checkoutForm.get('userName').value;
    return this.facultyService.findIfFacultyUserNameExist(username).pipe(map(res => {
      let temp = res == true;
      if (res == true) {
        return { userNameExists: true };
      }
    }));
  }
  
  showInfo() {
    this.facultyRegistrationPopupVisible = true;
    this.loadingVisible = false;
  }

  submit()
  {
    let faculty: Faculty = this.checkoutForm.value;
  //  console.log('registerFaculty called');

    this.stream.forEach ((streamElement) => {
      this.streamId = streamElement.id ;
    });

    this.facultyService.registerFaculty(faculty)
    .subscribe((data) => {
      notify('Faculty added successfully','success',4000);
      this.router.navigate(['/login']);
      this.loadingVisible = false;
    },
    (error) =>{
      this.loadingVisible = false;
      notify('Faculty not added.','success',4000);
      this.errorHandler.handleError(error);
    //  console.log(error);
      this.router.navigate(['/']);
    });
    
  };
}
