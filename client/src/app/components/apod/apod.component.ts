import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

@Component({
  selector: 'app-apod',
  template: `    
    <div>
      <h1 class="text-center">Apod</h1>
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
    <div *ngIf="apod">
      <h2 class="text-center">{{apod.title}}</h2>
      {{apod.copyright}} {{apod.date}}<br/>
      <img class="img-responsive" src="{{apod.hdurl}}">
      {{apod.explanation}}<br/>
      
    </div>
  `
})
export class ApodComponent {
  socket: any;
  apod: {};
  myOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  model: Object = { date: { year: 2017, month: 7, day: 14 } };

  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('send apod', (data) => {
      this.apod = JSON.parse(data);
    });

  }
  onDateChanged(event: IMyDateModel): void {
    this.socket.emit('get apod', event.date );
  }

}
