import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
//   assetSelected: string;
  formData: any;
  readonly rootURL = "https://localhost:44387/api"

  constructor(private http: HttpClient) { }

  getAllAssets(): Observable<any> {
    return this.http.get(this.rootURL + '/asset/');
  }
}