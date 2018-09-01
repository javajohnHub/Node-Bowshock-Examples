import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="ui-g">
    <div class="ui-g-12 ui-g-offset-5">
      <h1>Node Bowshock Examples</h1>
      <h4>Angular 2, Express, node-bowshock, and socket.io </h4>
      </div>
    </div>
    <div *ngIf="stats" class="ui-g">
    <div class="ui-g-12">
      Near Earth Object Count: {{stats.near_earth_object_count}}<br/>
      Close Approach Count: {{stats.close_approach_count}}<br/>
      Last Updated: {{stats.last_updated}}<br/>
      Source: <a href="{{stats.nasa_jpl_url}}">{{stats.source}}</a><br/>
</div>
    </div>
    
  `
})
export class HomeComponent {
  socket: any;
  stats: any = {};
  constructor( ) {
    this.socket = SocketService.getInstance();
    this.socket.on('send stats', (stats) => {
      this.stats = stats;
    });
    this.socket.emit('get stats');
  }


}
