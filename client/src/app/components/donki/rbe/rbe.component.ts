import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-rbe',
  templateUrl: 'rbe.component.html'
})
export class RBEComponent {
  socket: any;
  rbe;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send rbe", rbe => {
      this.rbe = rbe;
    });

    this.socket.emit('get rbe');
  }
}