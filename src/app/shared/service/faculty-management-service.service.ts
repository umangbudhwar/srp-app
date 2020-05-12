import { Injectable } from '@angular/core';
import { Faculty } from '../model/faculty';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyManagementServiceService {

  constructor(private httpClient: HttpClient) { }

  public registerFaculty(faculty) //add user
  {
    return this.httpClient.post<Faculty>(`${environment.apiUrl.UserUrl.registerFaculty}`, faculty);
  }

}
