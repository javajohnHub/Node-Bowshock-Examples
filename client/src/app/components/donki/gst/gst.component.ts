import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-gst',
  templateUrl: 'gst.component.html'
})
export class GSTComponent {
  socket: any;
  constructor() {
  }

  ngOnInit(){
    this.socket = SocketService.getInstance();
  }
}