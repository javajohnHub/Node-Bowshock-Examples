import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';


@Component({
  selector: 'app-eva',
  template: `
    <div class="ui-g-4 ui-g-offset-4">
    <h1>EVA</h1>
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
