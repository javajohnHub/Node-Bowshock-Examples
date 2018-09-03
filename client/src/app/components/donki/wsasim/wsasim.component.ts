import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-wsasim',
  templateUrl: 'wsasim.component.html'
})
export class WSASimComponent {
  socket: any;
  wsasim;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send wsasim", wsasim => {
      this.wsasim = wsasim;
    });

    this.socket.emit('get wsasim');
  }
}