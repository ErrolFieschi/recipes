import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";


@Injectable({
    providedIn: 'root'
})

export class AuthService {


    public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();

    private token!: string;
    private tokenGetter!: any;
    constructor(private http: HttpClient) { }

    getTokenFromLogin(data: any) {
        return this.http.post(`${environment.apiUrl}/auth/login`, data);

    }
    login(tokenServer: string) {
        this.token = tokenServer;
    }

    getToken(): string {
        //console.log(this.token)
        return this.token;
    }


    // setTokenHeaders(token = this.getToken()): Observable<any>{
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     })
    //     return this.http.get(apiUrl, {headers: headers})
        
    // }


    private setSession(authResult = this.getToken()) {
        //const expiresAt = moment().add(authResult,'second');
        localStorage.setItem('id_token', authResult);
        //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }
    
    // public isLoggedIn() {
    //     return moment().isBefore(this.getExpiration());
    // }

    // getExpiration() {
    //     const expiration = localStorage.getItem("expires_at");
    //     const expiresAt = JSON.parse(expiration);
    //     return moment(expiresAt);
    // } 








}

