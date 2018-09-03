import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-sep',
  templateUrl: 'sep.component.html'
})
export class SEPComponent {
  socket: any;
  sep;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send sep", sep => {
      this.sep = sep;
    });

    this.socket.emit('get sep');
  }
}