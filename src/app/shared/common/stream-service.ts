import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Streams } from '../model/streams';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  constructor(private httpClient: HttpClient) {}

  public getStreams():Observable<any>  { //add user
    return this.httpClient
      .get<Streams>(`${environment.apiUrl.UserUrl.getStreams}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
