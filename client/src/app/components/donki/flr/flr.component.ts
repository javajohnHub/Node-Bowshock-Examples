import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-flr',
  templateUrl: 'flr.component.html'
})
export class FLRComponent {
  socket: any;
  constructor() {
  }

  ngOnInit(){
    this.socket = SocketService.getInstance();
  }
}