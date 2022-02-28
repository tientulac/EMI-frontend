import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Injectable({
    providedIn: 'root'
})

export class TestService {
  
    constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration, private http: HttpClient) { }
  
    getListCustomer(): Observable<any> {
      return this.http
        .get<any>('http://localhost:8080/api/v1/customer')
        .pipe(
          map((z) => {
            return z;
          })
        );
    }

    getListLoan(): Observable<any> {
      return this.http
        .get<any>(this.appConfig.QA_API + 'api/v1/loan')
        .pipe(
          map((z) => {
            return z;
          })
        );
    }

    getListLoanByCustomer(customer_id: number): Observable<any> {
      return this.http
        .get<any>(this.appConfig.QA_API + 'api/v1/loan/?customer_id='+customer_id)
        .pipe(
          map((z) => {
            return z;
        })
      );
    }

    calculateLoan(req): Observable<any> {
      return this.http
        .post<any>(this.appConfig.QA_API + 'api/v1/loan/calculate',req)
        .pipe(
          map((z) => {
            return z;
          })
        );
    }

    insert(req): Observable<any> {
      return this.http
        .post<any>(this.appConfig.QA_API + 'api/v1/loan',req)
        .pipe(
          map((z) => {
            return z;
          })
        );
    }
}