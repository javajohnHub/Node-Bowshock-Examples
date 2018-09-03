import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-flr',
  templateUrl: 'flr.component.html'
})
export class FLRComponent {
  socket: any;
  flr;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send flr", flr => {
      this.flr = flr;
    });

    this.socket.emit('get flr');
  }
}