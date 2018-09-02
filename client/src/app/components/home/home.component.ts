import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  socket: any;
  stats: any = {};
  constructor( ) {
    this.socket = SocketService.getInstance();
    this.socket.on('send stats', (stats) => {
      this.stats = stats;
    });
    this.socket.emit('get stats');
  }


}
