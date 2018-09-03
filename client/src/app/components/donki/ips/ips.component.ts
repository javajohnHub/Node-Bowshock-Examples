import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-ips',
  templateUrl: 'ips.component.html'
})
export class IPSComponent {
  socket: any;
  ips;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send ips", ips => {
      this.ips = ips;
    });

    this.socket.emit('get ips');
  }
}