import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

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
    this._sharedService.subTitleSubject$.next('Space Weather Database Of Notifications, Knowledge, Information/Radiation Belt Enhancement')
    this.socket = SocketService.getInstance();

    this.socket.on("send rbe", rbe => {
      this.rbe = rbe;
    });

    this.socket.emit('get rbe');
  }
}