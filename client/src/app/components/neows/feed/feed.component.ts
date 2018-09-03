import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../../shared/socket.service';
import { SelectItem } from 'primeng/api';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-neows-feed',
  templateUrl: 'feed.component.html'
})
export class FeedComponent implements OnInit {
  socket: any;
  model: Date;

  currentPage: string;
  next: string;
  prev: string;

  element_count: number;
  near_earth_objects: {};
  date;
  neows: {};
  neowsObjs: any = [];

  sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._sharedService.subTitleSubject$.next('NeoWs/Feed')
    this.model = new Date();
    this.socket = SocketService.getInstance();
    let myDate = this.model.toISOString().split('T')[0]
    let last = parseInt(myDate.split('-')[2]);
    let str = myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;
    
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
          console.log(this.neowsObjs)
        //   this.sortOptions = [
        //     {label: 'Name', value: '!year'},
        //     {label: 'Oldest First', value: 'year'},
        //     {label: 'Brand', value: 'brand'}
        // ];
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
loadData(event: any){
  console.log(event)
}
onSortChange(event) {
  let value = event.value;

  if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
  }else {
      this.sortOrder = 1;
      this.sortField = value;
  }
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
