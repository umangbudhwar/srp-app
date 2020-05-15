import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../model/student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {

  constructor(private httpClient: HttpClient) { }

  public registerStudent(student) //add user
  {
    return this.httpClient.post<Student>(`${environment.apiUrl.UserUrl.registerStudent}`, student);
  }
}
