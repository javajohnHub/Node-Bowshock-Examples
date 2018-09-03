import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  socket: any;
  stats: any = {};
  constructor(private _sharedService: SharedService ) {}

  ngOnInit(){
    this.socket = SocketService.getInstance();
    this.socket.on('send stats', (stats) => {
      this.stats = stats;
    });
    this.socket.emit('get stats');
    this._sharedService.subTitleSubject$.next('Node Bowshock Examples')
  }


}
