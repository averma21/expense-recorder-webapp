import { Component, OnInit, HostListener } from '@angular/core';
import { MessagebusService, Event } from '../services/messagebus.service';
import { AppSettings } from '../constants/constants';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})

export class SpinnerComponent implements OnInit {

  show = false;
  loaderHeight: string;
  loaderWidth: string;
  loaderTop: string;
  loaderLeft: string;

  constructor(private messageBus: MessagebusService) {
    var self = this;
    this.messageBus.subsribe(AppSettings.messageBusEvents.SPINNER_SHOW, {
      handleEvent : (event: Event) => {self.show = true;}
    })

    this.messageBus.subsribe(AppSettings.messageBusEvents.SPINNER_HIDE, {
      handleEvent : (event: Event) => {self.show = false;}
    })
  }

  private adjust(winHeight: number, winWidth: number) {
    let loaderHW = winHeight * 0.15;
    this.loaderWidth = this.loaderHeight = loaderHW + "px";
    this.loaderTop = ((winHeight - loaderHW) / 2) + "px";
    this.loaderLeft = ((winWidth - loaderHW) / 2) + "px";
  }

  ngOnInit() {
    this.adjust(window.innerHeight, window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adjust(event.target.innerHeight, event.target.innerWidth);
  }

}
