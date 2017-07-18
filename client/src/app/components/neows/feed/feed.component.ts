import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../../shared/socket.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

@Component({
  selector: 'app-neows-feed',
  template: `
    <div>
      <h1 class="text-center">Neows Feed</h1>
      <h3 *ngIf="neows" class="text-center">Element Count: {{element_count}}</h3>
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
      <ul class="pager">
        <li class="previous"><a (click)="previous(prev)">&laquo; Previous</a></li>
        <li class="next"><a (click)="next_page(next)">Next &raquo;</a></li>
      </ul>
      <ng-container *ngIf="objects">

        <ng-container *ngFor="let object of objects;let i = index">
          <div *ngFor="let key of keys(object)">
            <app-zippy title="{{object[key].name}}">
            Reference ID: {{object[key].neo_reference_id}}<br/>
            Name: <a href="{{object[key].nasa_jpl_url}}">{{object[key].name}}</a><br/>
            Potentially Hazardous: <span [style.color]="getColor(object[key].is_potentially_hazardous_asteroid)">
              {{object[key].is_potentially_hazardous_asteroid}}</span><br/>
            Absolute Magnitude: {{object[key].absolute_magnitude_h}}<br/>
            Estimated diameter min km: {{object[key].estimated_diameter.kilometers.estimated_diameter_min}}<br/>
            Estimated diameter min km: {{object[key].estimated_diameter.kilometers.estimated_diameter_min}}<br/>
            Estimated diameter max km: {{object[key].estimated_diameter.kilometers.estimated_diameter_max}}<br/>
            Estimated diameter min meters: {{object[key].estimated_diameter.meters.estimated_diameter_min}}<br/>
            Estimated diameter max meters: {{object[key].estimated_diameter.meters.estimated_diameter_max}}<br/>
            Estimated diameter min miles: {{object[key].estimated_diameter.miles.estimated_diameter_min}}<br/>
            Estimated diameter max miles: {{object[key].estimated_diameter.miles.estimated_diameter_max}}<br/>
            Estimated diameter min feet: {{object[key].estimated_diameter.feet.estimated_diameter_min}}<br/>
            Estimated diameter max feet: {{object[key].estimated_diameter.feet.estimated_diameter_max}}<br/>
            <ng-container *ngFor="let approach_data of object[key].close_approach_data">
              Close Approach Date: {{approach_data.close_approach_date}}<br/>
              Epoch Date Close Approach: {{approach_data.epoch_date_close_approach}}<br/><br/>
              Relative Velocity: <br/>
              kps: {{approach_data.relative_velocity.kilometers_per_second}}<br/>
              kph: {{approach_data.relative_velocity.kilometers_per_hour}}<br/>
              mph: {{approach_data.relative_velocity.miles_per_hour}}<br/><br/>
              Miss Distance: <br/>
              Astronomical: {{approach_data.miss_distance.astronomical}}<br/>
              Lunar: {{approach_data.miss_distance.lunar}}<br/>
              Kilometers: {{approach_data.miss_distance.kilometers}}<br/>
              Miles: {{approach_data.miss_distance.miles}}<br/>
              Orbiting body: {{approach_data.orbiting_body}}<br/>
            </ng-container>
            </app-zippy>
          </div>
          
        </ng-container>
        <ul class="pager">
          <li class="previous"><a (click)="previous(prev)">&laquo; Previous</a></li>
          <li class="next"><a (click)="next_page(next)">Next &raquo;</a></li>
        </ul>
      </ng-container>

    </div>
  `
})
export class FeedComponent implements OnInit {
  socket: any;
  neows: {};
  myOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  model: Object = {date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}};

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
          this.objects.push(this.near_earth_objects[date]);
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
      this.objects = [];
      Object.keys(this.near_earth_objects).forEach((date, object) => {
        if (this.near_earth_objects[date] !== undefined) {
          this.objects.push(this.near_earth_objects[date]);
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
      this.objects = [];
      Object.keys(this.near_earth_objects).forEach((date, object) => {
        if (this.near_earth_objects[date] !== undefined) {
          this.objects.push(this.near_earth_objects[date]);
        }
      });
    });

    this.socket.emit('get feed', this.model['date']);


  }

  ngOnInit() {

  }

  onDateChanged(event: IMyDateModel): void {
    this.socket.emit('get feed', event.date);
    this.date = event.date;
  }

  previous(url) {
    this.socket.emit('get previous', url);
  }

  next_page(url) {
    this.socket.emit('get next', url);
  }

  keys(data): Array<string> {
    return Object.keys(data);
  }

  getColor(hazardous: boolean) {
    if (hazardous) {
      return 'red';
    } else {
      return 'green';
    }
  }

}
