import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <h1 class="text-center">Node Bowshock Examples</h1>
      <h4 class="text-center">Angular 2, Express, node-bowshock, and socket.io </h4>
    </div>
    <div *ngIf="stats" class="text-center">
      Near Earth Object Count: {{stats.near_earth_object_count}}<br/>
      Close Approach Count: {{stats.close_approach_count}}<br/>
      Last Updated: {{stats.last_updated}}<br/>
      Source: <a href="{{stats.nasa_jpl_url}}">{{stats.source}}</a><br/>

    </div>
    
  `
})
export class HomeComponent {
  socket: any;
  stats: {};
  constructor( ) {
    this.socket = SocketService.getInstance();
    this.socket.on('send stats', (data) => {
      this.stats = JSON.parse(data);
    });
    this.socket.emit('get stats');
  }


}
