import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-cmea',
  templateUrl: 'cmea.component.html'
})
export class CMEAComponent {
  socket: any;
  constructor() {
  }

  ngOnInit(){
    this.socket = SocketService.getInstance();
  }
}