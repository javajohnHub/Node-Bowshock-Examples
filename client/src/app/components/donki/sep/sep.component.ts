import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-sep',
  templateUrl: 'sep.component.html'
})
export class SEPComponent {
  socket: any;
  sep;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('Space Weather Database Of Notifications, Knowledge, Information/Solar energetic Particle')
    this.socket = SocketService.getInstance();

    this.socket.on("send sep", sep => {
      this.sep = sep;
    });

    this.socket.emit('get sep');
  }
}