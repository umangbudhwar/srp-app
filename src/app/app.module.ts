import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FacultyManagementComponent } from './faculty-management/faculty-management.component';
import { PopupComponent } from './popup/popup.component';
import { RegisterFacultyComponent } from './register-faculty/register-faculty.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';  
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthenticationService } from './shared/service/authentication.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './shared/common/jwt-interceptor';
import { ErrorsHandler } from './shared/common/errors-handler';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DxDataGridModule, DxLoadPanelModule,DxPopupModule,DxTreeListModule,DxLoadIndicatorModule, DxButtonModule }  from 'devextreme-angular/';
import { DxSelectBoxModule,
  DxTextBoxModule,
  DxTemplateModule } from 'devextreme-angular';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { HomeComponent } from './home/home.component';
import { FacultyManagementServiceService } from './shared/service/faculty-management-service.service';
import { StudentManagementService } from './shared/service/student-management.service';
import { StreamService } from './shared/common/stream-service';
import { SubjectService } from './shared/common/subject-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    FacultyManagementComponent,
    PopupComponent,
    RegisterFacultyComponent,
    AddStudentComponent,
    RegisterStudentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatTooltipModule, MatRadioModule, MatFormFieldModule ,
    MatDialogModule, MatSelectModule,
    MatToolbarModule ,FormsModule,ReactiveFormsModule ,DxDataGridModule,DxLoadIndicatorModule,
    DxLoadPanelModule,DxButtonModule,
    DxPopupModule,
    DxTreeListModule, DxSelectBoxModule,
    DxTextBoxModule,
    DxTemplateModule
  ],
  providers: [SubjectService,StreamService,StudentManagementService, FacultyManagementServiceService,AuthenticationService,{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    ErrorsHandler,
  {
    provide: ErrorHandler,useClass: ErrorsHandler,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
