import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import * as moment from 'moment';
@Component({
  selector: 'app-wsasim',
  templateUrl: 'wsasim.component.html'
})
export class WSASimComponent {
  socket: any;
  wsasim;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('DONKI/WSA + Enlil Simulation')
    this.socket = SocketService.getInstance();

    this.socket.on("send wsasim", wsasim => {
      this.wsasim = wsasim;
    });

    this.socket.emit('get wsasim');
  }
}