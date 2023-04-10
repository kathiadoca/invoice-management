import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from "src/app/model/login.interface";
import { ResponseLogin } from "src/app/model/response-login.interface";
import { UserDto } from "src/app/model/user.dto";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    url: string = 'http://localhost:8080/ecommerce'; 
    constructor(private httpClient: HttpClient) {}

    login(form: Login): Observable<ResponseLogin>{
        let direccion = this.url + "/auth/login";
        return this.httpClient.post<ResponseLogin>(direccion, form);
    }

    signup(form: UserDto): Observable<ResponseLogin>{
        let direccion = this.url + "/auth/register";
        return this.httpClient.post<ResponseLogin>(direccion, form);
    }
}