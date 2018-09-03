import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-hss',
  templateUrl: 'hss.component.html'
})
export class HSSComponent {
  socket: any;
  hss;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send hss", hss => {
      this.hss = hss;
    });

    this.socket.emit('get hss');
  }
}