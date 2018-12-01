import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(emailID: string, password: string, successFn: Function, errorFn: Function) {
    var formData = new FormData();
    formData.append("emailID", emailID);
    formData.append("password", password)
    this.httpClient.post("http://localhost:8080/login", formData, {responseType: 'text'}).subscribe({
      error: err => {
        console.error('Observer got following error: ');
        console.error(err);
        errorFn(err);
      },
      next: (res: string) => {
        successFn(res)
      }
    })
  }

}
