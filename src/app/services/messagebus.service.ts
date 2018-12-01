import { Injectable } from '@angular/core';

export class Event {
  constructor(public title: string, public data) {
  }
}

export interface EventHandler {
  handleEvent(event : Event)
}

@Injectable({
  providedIn: 'root'
})
export class MessagebusService {

  private listeners: Map<string, Array<EventHandler>> = new Map<string, Array<EventHandler>>();

  constructor() { }

  subsribe(event: string, handler: EventHandler) {
    if (!this.listeners.get(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(handler);
  }

  postEvent(event: Event) {
    let ls = this.listeners.get(event.title);
    if (ls) {
      for (let i = 0; i < ls.length; i++) {
        ls[i].handleEvent(event);
      }
    }
  }

}
