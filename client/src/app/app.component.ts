import { Component } from '@angular/core';
import {SocketService} from './shared/socket.service';
import { Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket: any;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.socket = SocketService.getInstance();
  }
  scrollTop() {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }
}
