import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-cmea',
  templateUrl: 'cmea.component.html'
})
export class CMEAComponent {
  socket: any;
  cmea;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send cmea", cmea => {
      this.cmea = cmea;
    });

    this.socket.emit('get cmea');
  }
}