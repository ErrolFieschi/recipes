import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, mapTo, map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { RegisterValue } from "../models/register-value.model";

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) { }


    //   saveUserInfo(formValue: any){
    //     return this.http.post(`${environment.apiUrl}/auth/signup`, formValue).pipe(
    //       map(() => true),
    //       delay(1000),
    //       catchError(() => of(false).pipe(
    //         delay(1000)
    //       ))
    //     );
    //   }
    // }

    addUser(data: any) {
        return this.http.post(`${environment.apiUrl}/auth/signup`, data);
    }

};