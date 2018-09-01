import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="ui-xl-4 ui-lg-6 ui-md-10 ui-sm-12 ui-md-offset-1 ui-lg-offset-2 ui-xl-offset-4">
    <div class="ui-g-12">
   
      <h1>Node Bowshock Examples</h1>
      <h4>Angular 6, PrimeNg, Express, node-bowshock, and socket.io </h4>
      </div>
   
  
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
