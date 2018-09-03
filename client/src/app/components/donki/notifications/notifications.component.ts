import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.component.html'
})
export class NotificationsComponent {
  socket: any;
  notifications;
  constructor() {
  }

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send notifications", notifications => {
      this.notifications = notifications;
    });

    this.socket.emit('get notifications');
  }
}