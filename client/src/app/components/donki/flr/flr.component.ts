import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import * as moment from 'moment';
@Component({
  selector: 'app-flr',
  templateUrl: 'flr.component.html'
})
export class FLRComponent {
  socket: any;
  flr;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('DONKI/Solar Flare')
    this.socket = SocketService.getInstance();

    this.socket.on("send flr", flr => {
      this.flr = flr;
    });

    this.socket.emit('get flr');
  }
}