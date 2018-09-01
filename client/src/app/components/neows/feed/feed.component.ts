import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../../shared/socket.service';

@Component({
  selector: 'app-neows-feed',
  template: `
  <div class="ui-g">
  
    <div class="ui-g-12">
    <h1>Feed</h1>
          
    <div class="ui-g-12">
    <div class="ui-g-12">
    <p-calendar [showIcon]="true" [selectOtherMonths]="true" [readonlyInput]="true" (onSelect)="onDateChanged($event)" [(ngModel)]="model" dateFormat="yy-mm-dd" [maxDate]="maxDate"></p-calendar>
    </div>
    <div class="ui-g-6">
      <div class="previous"><a (click)="previous(prev)">&laquo; Previous</a></div>
      </div>
      <div class="ui-g-6">
      <div class="next" style="text-align: right"><a (click)="next_page(next)">Next &raquo;</a></div>
      </div>
      </div>
  
  
  <div *ngIf="neows" class="ui-g-12">
  <ng-container *ngFor="let object of neowsObjs;let i = index">
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
    </div>
  </div>
  </div>
  `
})
export class FeedComponent implements OnInit {
  socket: any;
  model: Date;
  maxDate: Date;

  currentPage: string;
  next: string;
  prev: string;

  element_count: number;
  near_earth_objects: {};
  date;
  neows: {};
  neowsObjs: any = [];

  constructor() {
  }

  ngOnInit() {
    this.model = new Date();
    this.socket = SocketService.getInstance();
    let myDate = this.model.toISOString().split('T')[0]
    let last = parseInt(myDate.split('-')[2]);
    let str = myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;
    this.maxDate = new Date(str)
    
    this.socket.on('send feed', (data) => {
      this.neows = data;
      this.currentPage = this.neows['links'].self;
      this.next = this.neows['links'].next;
      this.prev = this.neows['links'].prev;
      this.element_count = this.neows['element_count'];
      this.near_earth_objects = this.neows['near_earth_objects'];
      this.neowsObjs = [];
      Object.keys(this.near_earth_objects).forEach((date, object) => {
        if (this.near_earth_objects[date] !== undefined) {
          this.neowsObjs.push(this.near_earth_objects[date]);
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
      this.neowsObjs = [];
      Object.keys(this.near_earth_objects).forEach((date, object) => {
        if (this.near_earth_objects[date] !== undefined) {
          this.neowsObjs.push(this.near_earth_objects[date]);
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
      this.neowsObjs = [];
      Object.keys(this.near_earth_objects).forEach((date, object) => {
        if (this.near_earth_objects[date] !== undefined) {
          this.neowsObjs.push(this.near_earth_objects[date]);
        }
      });
    });

    this.socket.emit('get feed', str);
  }

  onDateChanged(event): void {
    console.log(event)
    this.model = new Date(event);
    let myDate = this.model.toISOString().split('T')[0]
    this.socket.emit('get feed', myDate);
    this.date = event;
  }

  previous(url) {
    this.model = new Date(this.model);
    this.model.setDate(this.model.getDate() - 1);
    this.socket.emit('get previous', url);
  }

  next_page(url) {
    this.model = new Date(this.model);
    this.model.setDate(this.model.getDate() + 1);
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
