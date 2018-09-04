import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import * as moment from 'moment';
@Component({
  selector: 'app-cmea',
  templateUrl: 'cmea.component.html'
})
export class CMEAComponent {
  socket: any;
  cmea;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('Space Weather Database Of Notifications, Knowledge, Information/Coronal Mass Ejection Analysis')
    this.socket = SocketService.getInstance();

    this.socket.on("send cmea", cmea => {
      this.cmea = cmea;
    });

    this.socket.emit('get cmea');
  }
}