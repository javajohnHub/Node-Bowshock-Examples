import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import * as moment from 'moment';
@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.component.html'
})
export class NotificationsComponent {
  socket: any;
  notifications;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('DONKI/Notifications')
    this.socket = SocketService.getInstance();

    this.socket.on("send notifications", notifications => {
      this.notifications = notifications;
    });

    this.socket.emit('get notifications');
  }
}