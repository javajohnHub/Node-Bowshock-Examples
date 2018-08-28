import { Component } from '@angular/core';
import {SocketService} from '../../../shared/socket.service';


@Component({
  selector: 'app-spirit',
  template: `
    <div>
      <h1>Spirit</h1>
      <form>
        <div class="input-group">
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
        <img class="img-responsive center" src="{{picture.img_src}}"><br/>
      </ng-container>
      <div *ngIf="pictures.photos.length == 0">
        <h1 class="text-center">No Photos Found</h1>
      </div>
    </div>
  `
})
export class SpiritComponent {
  socket: any;
  pictures: {};
  model: Object = { date: { year: 2010, month: 3, day: 21 } };

  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('send spirit', (data) => {
      this.pictures = data;
    });
    this.socket.emit('get spirit', this.model['date'] );

  }
  onDateChanged(event): void {
    this.socket.emit('get spirit', event.date );
  }

}
