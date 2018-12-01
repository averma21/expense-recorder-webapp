import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MessagebusService, Event } from '../services/messagebus.service';
import {AppSettings} from '../constants/constants'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailID: String;
  password: String;
  
  constructor(private router: Router, private loginService: LoginService, 
    private messageBus: MessagebusService) { }

  ngOnInit() {
  }

  onClick = function() {
    this.messageBus.postEvent(new Event(AppSettings.messageBusEvents.SPINNER_SHOW, {}));
    let self = this;
    this.loginService.login(this.emailID, this.password, function(res) {
      self.messageBus.postEvent(new Event(AppSettings.messageBusEvents.SPINNER_HIDE, {}));
      alert("logged in");
    }, function(err) {
      self.messageBus.postEvent(new Event(AppSettings.messageBusEvents.SPINNER_HIDE, {}));
      self.messageBus.postEvent(new Event(AppSettings.messageBusEvents.MODAL_SHOW,
        {message: "Could not login - " + err.status + " " + err.statusText}));
    });
  }

}
