import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../../shared/socket.service';


@Component({
  selector: 'app-neows-today',
  templateUrl: 'today.component.html'
})
export class TodayComponent implements OnInit {
  socket: any;
  neows: {};
  currentPage: string;
  next: string;
  prev: string;
  labels: any = [];
  element_count: number;
  near_earth_objects: {};
  date;
  objects: any = [];
i: number = 0;
  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('send today', (data) => {
      this.neows = data;
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
      this.objects.forEach((object) => {
        object.forEach(obj => {
          this.labels.push(obj.name)

        })
      })
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
