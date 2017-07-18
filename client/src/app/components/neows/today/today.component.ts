import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../../shared/socket.service';


@Component({
  selector: 'app-neows-today',
  template: `
    <div>
      <h1 class="text-center">Neows Today</h1>
      
    </div>
    <div *ngIf="neows">
      <ul class="pager">
        <li class="previous"><a (click)="previous(prev)">&laquo; Previous</a></li>
        <li class="next"><a (click)="next_page(next)">Next &raquo;</a></li>
      </ul>
      <h3 class="text-center">Element Count: {{element_count}}</h3>
      <br/>
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
                Kilometers: {{approach_data.miss_distance.kilometers}}<br/>a
                Miles: {{approach_data.miss_distance.miles}}<br/>
                Orbiting body: {{approach_data.orbiting_body}}<br/><br/>
              </ng-container>
              Orbital Data: <br/>
              Orbit ID: {{object[key].orbital_data.orbit_id}}<br/>
              Orbit determination date: {{object[key].orbital_data.orbit_determination_date}}<br/>
              Orbit uncertainty: {{object[key].orbital_data.orbit_uncertainty}}<br/>
              Min orbit itersection: {{object[key].orbital_data.orbit_uncertainty}}<br/>
              Jupitor tisserand invariant: {{object[key].orbital_data.orbit_uncertainty}}<br/>
              Epoch osculation: {{object[key].orbital_data.epoch_osculation}}<br/>
              Eccentricity: {{object[key].orbital_data.eccentricity}}<br/>
              Semi major axis: {{object[key].orbital_data.semi_major_axis}}<br/>
              Inclination: {{object[key].orbital_data.inclination}}<br/>
              Ascending node longitude: {{object[key].orbital_data.ascending_node_longitude}}<br/>
              Orbital period: {{object[key].orbital_data.orbital_period}}<br/>
              Perihelion distance: {{object[key].orbital_data.perihelion_distance}}<br/>
              Perihelion argument: {{object[key].orbital_data.perihelion_argument}}<br/>
              Perihelion time: {{object[key].orbital_data.perihelion_time}}<br/>
              Aphelion distance: {{object[key].orbital_data.aphelion_distance}}<br/>
              Mean anomaly: {{object[key].orbital_data.mean_anomaly}}<br/>
              Mean motion: {{object[key].orbital_data.mean_motion}}<br/>
              Equinox: {{object[key].orbital_data.equinox}}<br/>
              <br/>
              <hr/>

          
            </app-zippy>
          </div>
        </ng-container>
      </ng-container>

    </div>
  `
})
export class TodayComponent implements OnInit {
  socket: any;
  neows: {};
  currentPage: string;
  next: string;
  prev: string;

  element_count: number;
  near_earth_objects: {};
  date;
  objects: any = [];

  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('send today', (data) => {
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

    this.socket.emit('get today');


  }

  ngOnInit() {

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
