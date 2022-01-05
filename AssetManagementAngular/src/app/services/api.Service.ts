import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
//   assetSelected: string;
  formData: any;
  readonly rootURL = "https://localhost:44387/api"

  constructor(private http: HttpClient) { }
  
  getAssetByAssetId(id : any): Observable<any> {
    return this.http.get(this.rootURL + '/asset/' + id);
  }

  getAllManufacturers(): Observable<any> {
    return this.http.get(this.rootURL + '/manufacturer');
  }

  getAllModels(): Observable<any> {
    return this.http.get(this.rootURL + '/model');
  }

  getAllColors(): Observable<any> {
    return this.http.get(this.rootURL + '/color');
  }

  addAsset(data : any): Observable<any> {
    console.log(1);
    return this.http.post<any>(this.rootURL + '/asset', data);
    // .pipe(catchError(this.errorHandler)) //catch errors
  }

    errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}