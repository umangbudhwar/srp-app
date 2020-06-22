import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  PopupComponent } from './popup/popup.component';
import { LoginComponent } from './login/login.component';
import { RegisterFacultyComponent } from './register-faculty/register-faculty.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './shared/common/auth-guard';
import { LogoutComponent } from './logout/logout.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { AssignGroupComponent } from './assign-group/assign-group.component';
import { ChangeGroupComponent } from './change-group/change-group.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: PopupComponent }, 
  { path: 'popup', component: PopupComponent }, 
  { path: 'registerFaculty', component: RegisterFacultyComponent },
  { path: 'registerStudent', component: RegisterStudentComponent },

 /*  { path: 'logout',component: LogoutComponent},          
  { path: 'home',component: HomeComponent},             
  { path: 'dashboards',component: DashboardsComponent},    
  { path: 'assignGroup',component: AssignGroupComponent},  
  { path: 'changeGroup',component: ChangeGroupComponent} */

  { path: 'logout', component: LogoutComponent,canActivate:[AuthGuardService] },           //canActivate:[AuthGuardService]
  { path: 'home', component: HomeComponent,canActivate:[AuthGuardService]},                //canActivate:[AuthGuardService]
  { path: 'dashboards', component: DashboardsComponent,canActivate:[AuthGuardService]},    //canActivate:[AuthGuardService] 
  { path: 'assignGroup', component: AssignGroupComponent,canActivate:[AuthGuardService]},  // ,canActivate:[AuthGuardService]
  { path: 'changeGroup', component: ChangeGroupComponent,canActivate:[AuthGuardService]},
  { path: 'home/dashboards', component: DashboardsComponent,canActivate:[AuthGuardService]}, 
  { path: 'home/assignGroup', component: AssignGroupComponent,canActivate:[AuthGuardService]},  // ,canActivate:[AuthGuardService]
  { path: 'home/changeGroup', component: ChangeGroupComponent,canActivate:[AuthGuardService]}, 
  { path: 'home/logout', component: LogoutComponent,canActivate:[AuthGuardService] }  //canActivate:[AuthGuardService] 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
