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
      <ng-container *ngIf="objects">
        Element Count: {{element_count}}<br/>
        <ng-container *ngFor="let object of objects;">
          Reference ID: {{object.neo_reference_id}}<br/>
          Name: <a href="{{object.nasa_jpl_url}}">{{object.name}}</a><br/>
          Potentially Hazardous: {{object.is_potentially_hazardous_asteroid}}<br/>
          Absolute Magnitude: {{object.absolute_magnitude_h}}<br/>
          Estimated diameter min km: {{object.estimated_diameter.kilometers.estimated_diameter_min}}<br/>
          Estimated diameter max km: {{object.estimated_diameter.kilometers.estimated_diameter_max}}<br/>
          Estimated diameter min meters: {{object.estimated_diameter.meters.estimated_diameter_min}}<br/>
          Estimated diameter max meters: {{object.estimated_diameter.meters.estimated_diameter_max}}<br/>
          Estimated diameter min miles: {{object.estimated_diameter.miles.estimated_diameter_min}}<br/>
          Estimated diameter max miles: {{object.estimated_diameter.miles.estimated_diameter_max}}<br/>
          Estimated diameter min feet: {{object.estimated_diameter.feet.estimated_diameter_min}}<br/>
          Estimated diameter max feet: {{object.estimated_diameter.feet.estimated_diameter_max}}<br/>
          <ng-container *ngFor="let approach_data of object.close_approach_data">
            Close Approach Date: {{approach_data.close_approach_date}}<br/>
            Epoch Date Close Approach: {{approach_data.epoch_date_close_approach}}<br/>
            {{approach_data.relative_velocity | json}}<br/>
            {{approach_data.miss_distance | json}}<br/>
          </ng-container>
          <br/>
        </ng-container>
        {{objects | json}}
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

  currentPage: string;
  next: string;
  prev: string;

  element_count: number;
  near_earth_objects: {};
  date;
  objects: any = [];
  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('send feed', (data) => {
      this.neows = JSON.parse(data);
      this.currentPage = this.neows['links'].self;
      this.next = this.neows['links'].next;
      this.prev = this.neows['links'].prev;
      this.element_count = this.neows['element_count'];
      this.near_earth_objects = this.neows['near_earth_objects'];
      Object.keys(this.near_earth_objects).forEach((date, object) => {
        if (this.near_earth_objects[date] !== undefined) {
          this.objects = this.near_earth_objects[date];
        }
      });
    });

    this.socket.on('send previous', (data) => {
      this.neows = data;
      this.currentPage = this.neows['links'].self;
      this.next = this.neows['links'].next;
      this.prev = this.neows['links'].prev;
      this.element_count = this.neows['element_count'];
      this.near_earth_objects = this.neows['near_earth_objects'];
      Object.keys(this.near_earth_objects).forEach((date, object) => {
        if (this.near_earth_objects[date] !== undefined) {
          this.objects = this.near_earth_objects[date];
        }
      });
    });

    this.socket.on('send next', (data) => {
      this.neows = data;
      this.currentPage = this.neows['links'].self;
      this.next = this.neows['links'].next;
      this.prev = this.neows['links'].prev;
      this.element_count = this.neows['element_count'];
      this.near_earth_objects = this.neows['near_earth_objects'];
      Object.keys(this.near_earth_objects).forEach((date, object) => {
        if (this.near_earth_objects[date] !== undefined) {
          this.objects = this.near_earth_objects[date];
        }
      });
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
