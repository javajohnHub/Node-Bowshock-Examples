import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-gst',
  templateUrl: 'gst.component.html'
})
export class GSTComponent {
  socket: any;
  gst;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('Space Weather Database Of Notifications, Knowledge, Information/Geo Magnetic Storm')
    this.socket = SocketService.getInstance();

    this.socket.on("send gst", gst => {
      this.gst = gst;
    });

    this.socket.emit('get gst');
  }
}