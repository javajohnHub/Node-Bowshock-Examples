import { Component } from '@angular/core';
import {SocketService} from '../../../shared/socket.service';


@Component({
  selector: 'app-opportunity',
  template: `
    <div>
      <h1>Opportunity</h1>
      <form>
        <div class="form-group">
        <form>
        <div>
            <p-calendar [(ngModel)]='model'></p-calendar>
        </div>
      </form>
        </div>
      </form><br/>
    </div>
    <div *ngIf="pictures">
      <ng-container *ngFor="let picture of pictures.photos">
        <img class="ui-fluid center" src="{{picture.img_src}}"><br/>
      </ng-container>
      <div *ngIf="pictures.photos.length == 0">
        <h1>No Photos Found</h1>
      </div>
    </div>
  `
})
export class OpportunityComponent {
  socket: any;
  pictures: {};
  model: Object = { date: { year: 2017, month: 2, day: 20 } };

  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('send opportunity', (data) => {
      this.pictures = data;
    });
    this.socket.emit('get opportunity', this.model['date'] );
  }
  onDateChanged(event): void {
    this.socket.emit('get opportunity', event.date );
  }

}
