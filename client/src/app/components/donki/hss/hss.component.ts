import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-hss',
  templateUrl: 'hss.component.html'
})
export class HSSComponent {
  socket: any;
  constructor() {
  }

  ngOnInit(){
    this.socket = SocketService.getInstance();
  }
}