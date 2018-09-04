import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import * as moment from 'moment';
@Component({
  selector: 'app-rbe',
  templateUrl: 'rbe.component.html'
})
export class RBEComponent {
  socket: any;
  rbe;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('DONKI/Radiation Belt Enhancement')
    this.socket = SocketService.getInstance();

    this.socket.on("send rbe", rbe => {
      this.rbe = rbe;
    });

    this.socket.emit('get rbe');
  }
}