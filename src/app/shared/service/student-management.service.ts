import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../model/student';
import { environment } from 'src/environments/environment';
import { UpdateStudentGroup } from '../model/update-group';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {

  constructor(private httpClient: HttpClient) { }

  public registerStudent(student) //add user
  {
    return this.httpClient.post<Student>(`${environment.apiUrl.UserUrl.registerStudent}`, student);
  }

  public getStudentForReportGeneration(facultyUserName: String)
  {
    let url = `${environment.apiUrl.UserUrl.getStudents}`+`/`+facultyUserName;
    return this.httpClient.get<Student[]>(url);
  }

 /*  public updateStudent(student: Student)
  {
    let url = `${environment.apiUrl.UserUrl.updateStudent}`;
    return this.httpClient.put<Student>(url,student);
  } */
  public fetchStudentList(studentUserName: String)
  {
    let url = `${environment.apiUrl.UserUrl.fetchStudentList}`+`/`+studentUserName;
    return this.httpClient.get<Student[]>(url);
  }

  public updateGroupCode(student:Student)
  {
    let url = `${environment.apiUrl.UserUrl.updateGroupCode}`;
    return this.httpClient.put<Student>(url,student);
  }

  public loadCountOfStudentYearWise()
  {
    let url = `${environment.apiUrl.UserUrl.loadCountOfStudentYearWise}`;
    return this.httpClient.get<Map<number,number>>(url);
  }

  public yearWiseStudentRecords(year:number)
  {
    let url = `${environment.apiUrl.UserUrl.fetchYearWiseStudentRecords}`+`/`+year;
    return this.httpClient.get<Student[]>(url);
  }

  public updateGroups(studentList:UpdateStudentGroup[])
  {
    let url = `${environment.apiUrl.UserUrl.updateBatchGroupCode}`;
    return this.httpClient.put<Student[]>(url,studentList);
  }
  public findIfUserNameExists(userName:string)
  {
    let url = `${environment.apiUrl.UserUrl.findIfUserNameExist}`+`/`+userName;
    return this.httpClient.get<boolean>(url);
  }
  
  /* public findIfUserNameExist(userName:string) {
    return this.findIfUserNameExist(userName).pipe(map(res =>{
      return res ? null : {userNameExists: true};
    }));
  } */
}
