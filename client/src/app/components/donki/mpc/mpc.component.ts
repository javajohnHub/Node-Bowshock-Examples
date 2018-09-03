import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-mpc',
  templateUrl: 'mpc.component.html'
})
export class MPCComponent {
  socket: any;
  mpc;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send mpc", mpc => {
      this.mpc = mpc;
    });

    this.socket.emit('get mpc');
  }
}