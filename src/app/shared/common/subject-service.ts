import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from '../model/subject';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class SubjectService {

    constructor(private httpClient: HttpClient) { }

  public getSubjects(): Observable<any> //add user
  {
    return this.httpClient.get<Subject>(`${environment.apiUrl.UserUrl.getSubjects}`)
    .pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
}
}