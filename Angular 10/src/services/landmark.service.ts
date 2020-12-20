import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LandMarkDto } from 'src/app/models/land-mark.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LandMarkService {
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }
  getData(): Observable<LandMarkDto[]> {
    const url = '/api/Test';
    return this.httpClient.get(url).pipe(catchError(this.handleError<Observable<LandMarkDto[]>>()), tap((x: LandMarkDto[]) => {
      return x;
    }));
  }

  postData(data: LandMarkDto): Observable<LandMarkDto> {
    const url = '/api/Test';
    return this.httpClient.post(url, data).pipe(catchError(this.handleError<Observable<LandMarkDto>>()), tap((x: LandMarkDto) => {
      return x;
    }));
  }

  private handleError<T>(t?: any) {
    return (error: any): Observable<T> => {
      if (error?.statusCode !== 404) {
        this._snackBar.open("Error Occured", "OK", {
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
      return of(t as T);
    };
  }
}
