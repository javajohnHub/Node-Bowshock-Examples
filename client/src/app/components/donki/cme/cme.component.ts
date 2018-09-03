import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-cme',
  templateUrl: 'cme.component.html'
})
export class CMEComponent {
  socket: any;
  constructor() {
  }

  ngOnInit(){
    this.socket = SocketService.getInstance();
  }
}
