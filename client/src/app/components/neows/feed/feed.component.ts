import { Component } from '@angular/core';
import {SocketService} from '../../../shared/socket.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

@Component({
  selector: 'app-neows-feed',
  template: `
    <div>
      <h1 class="text-center">Neows Feed</h1>
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
    <div *ngIf="neows">
      <button (click)="previous(prev)">&laquo; Previous</button>
      <button class="pull-right"(click)="next_page(next)">Next &raquo;</button><br/><br/>
      <ng-container>
        Element Count: {{element_count}}<br/>
        {{near_earth_objects | json}}<br/>
      </ng-container>
    </div>
  `
})
export class FeedComponent {
  socket: any;
  neows: {};
  myOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  model: Object = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };

  totalItems: number;
  currentPage: string;
  next: string;
  prev: string;
  smallnumPages: number;

  element_count: number;
  near_earth_objects: {};
  date;

  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('send feed', (data) => {
      this.neows = JSON.parse(data);
      this.currentPage = this.neows['links'].self;
      this.next = this.neows['links'].next;
      this.prev = this.neows['links'].prev;
      this.element_count = this.neows['element_count'];
      this.near_earth_objects = this.neows['near_earth_objects'];
    });

    this.socket.on('send previous', (data) => {
      this.neows = data;
      this.currentPage = this.neows['links'].self;
      this.next = this.neows['links'].next;
      this.prev = this.neows['links'].prev;
      this.element_count = this.neows['element_count'];
      this.near_earth_objects = this.neows['near_earth_objects'];
    });

    this.socket.on('send next', (data) => {
      this.neows = data;
      this.currentPage = this.neows['links'].self;
      this.next = this.neows['links'].next;
      this.prev = this.neows['links'].prev;
      this.element_count = this.neows['element_count'];
      this.near_earth_objects = this.neows['near_earth_objects'];
    });

    this.socket.emit('get feed', this.model['date'] );
  }
  onDateChanged(event: IMyDateModel): void {
    this.socket.emit('get feed', event.date );
    this.date = event.date;
  }

  previous(url) {
    this.socket.emit('get previous', url );
  }

  next_page(url) {
    this.socket.emit('get next', url );
  }

}
