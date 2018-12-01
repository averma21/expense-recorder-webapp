import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessagebusService, Event } from '../services/messagebus.service';
import { AppSettings } from '../constants/constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  constructor(private modalService: BsModalService, private messageBus: MessagebusService) {}

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown: boolean = false;

  message = "Hello"
 
  showModal(): void {
    this.isModalShown = true;
  }
 
  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  ngOnInit() {
    let self = this;
    this.messageBus.subsribe(AppSettings.messageBusEvents.MODAL_SHOW, {
      handleEvent : (event: Event) => {
        self.message = event.data["message"]
        self.showModal()
      }
    })

    this.messageBus.subsribe(AppSettings.messageBusEvents.MODAL_HIDE, {
      handleEvent : (event: Event) => {self.hideModal()}
    })
  }

}
