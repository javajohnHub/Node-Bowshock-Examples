import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-gst',
  templateUrl: 'gst.component.html'
})
export class GSTComponent {
  socket: any;
  gst;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send gst", gst => {
      this.gst = gst;
    });

    this.socket.emit('get gst');
  }
}