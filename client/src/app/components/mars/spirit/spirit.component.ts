import { Component } from '@angular/core';
import {SocketService} from '../../../shared/socket.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

@Component({
  selector: 'app-spirit',
  template: `
    <div>
      <h1 class="text-center">Spirit</h1>
      <form>
        <div class="input-group">
          <input class="form-control" style="float:none" placeholder="Select a date" ngx-mydatepicker name="mydate"
                 [(ngModel)]="model" [options]="myOptions" #dp="ngx-mydatepicker" (dateChanged)="onDateChanged($event)"
                 disabled/>

          <span class="input-group-btn">
            <button type="button" class="btn btn-default" (click)="dp.toggleCalendar()">
                <i class="glyphicon glyphicon-calendar"></i>
            </button>
        </span>
        </div>
      </form>
    </div>
    <div *ngIf="pictures">
      <ng-container *ngFor="let picture of pictures.photos">
        <img class="img-responsive" src="{{picture.img_src}}">
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
  myOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  model: Object = { date: { year: 2010, month: 3, day: 22 } };

  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('send spirit', (data) => {
      this.pictures = JSON.parse(data);
    });
    this.socket.emit('get spirit', this.model['date'] );

  }
  onDateChanged(event: IMyDateModel): void {
    this.socket.emit('get spirit', event.date );
  }

}
