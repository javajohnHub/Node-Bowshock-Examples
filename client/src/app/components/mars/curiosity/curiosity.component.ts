import { Component } from '@angular/core';
import {SocketService} from '../../../shared/socket.service';

@Component({
  selector: 'app-curiosity',
  template: `
    <div>
      <h1 class="text-center">Curiosity</h1>
      <form>
        <div class="form-group">
        <form>
        <div>
            <p-calendar [(ngModel)]='model' [ngModelOptions]="{standalone: true}"></p-calendar>
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
export class CuriosityComponent {
  socket: any;
  pictures: {};
  model: Object = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 } };
  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.emit('get curiosity', this.model['date'] );
    this.socket.on('send curiosity', (data) => {
      this.pictures = data;
    });
    

  }
  onDateChanged(event): void {
    this.socket.emit('get curiosity', event.date );
  }


}
