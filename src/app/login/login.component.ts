import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailID: String;
  password: String;
  
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  onClick = function() {
    this.loginService.login(this.emailID, this.password);
  }

}
