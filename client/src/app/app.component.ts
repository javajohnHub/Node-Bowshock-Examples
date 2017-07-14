import { Component } from '@angular/core';
import {SocketService} from './shared/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  socket: any;
  constructor() {
    this.socket = SocketService.getInstance();
  }
}
