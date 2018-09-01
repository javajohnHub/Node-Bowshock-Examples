import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';


@Component({
  selector: 'app-eva',
  template: `
  <h1 class="ui-xl-4 ui-lg-6 ui-md-10 ui-sm-12 ui-md-offset-1 ui-lg-offset-2 ui-xl-offset-4">Apod</h1>
    <div class="ui-g-12">
      <div *ngIf="eva">
        <ng-container *ngFor="let walk of eva">
          <div>
            EVA number: {{walk.eva}}<br/>
            Country: {{walk.country}}<br/>
            Crew: {{walk.crew}}<br/>
            Date: {{walk.date}}<br/>
            Duration: {{walk.duration}}<br/>
            Vehicle: {{walk.vehicle}}<br/>
            Purpose: {{walk.purpose}}<br/><br/><hr/>
            
          </div>
        </ng-container>
      </div>
      
    </div>
  `,
  styles: []
})
export class EvaComponent {
  socket: any;
  eva: {};

  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('recieve eva', (data) => {
      this.eva = data;
    });
    this.socket.emit('get eva');

  }

}
