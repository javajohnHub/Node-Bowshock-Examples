import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-hss',
  templateUrl: 'hss.component.html'
})
export class HSSComponent {
  socket: any;
  hss;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('Space Weather Database Of Notifications, Knowledge, Information/High Speed Stream')
    
    this.socket = SocketService.getInstance();

    this.socket.on("send hss", hss => {
      this.hss = hss;
    });

    this.socket.emit('get hss');
  }
}