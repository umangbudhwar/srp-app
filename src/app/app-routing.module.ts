import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  PopupComponent } from './popup/popup.component';
import { LoginComponent } from './login/login.component';
import { RegisterFacultyComponent } from './register-faculty/register-faculty.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './shared/common/auth-guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: PopupComponent },
  { path: 'home', component: HomeComponent},
  { path: 'registerFaculty', component: RegisterFacultyComponent },
  { path: 'registerStudent', component: RegisterStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
