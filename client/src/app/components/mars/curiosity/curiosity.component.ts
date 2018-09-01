import { Component } from '@angular/core';
import {SocketService} from '../../../shared/socket.service';

@Component({
  selector: 'app-curiosity',
  template: `
  <h1 class="ui-g ui-g-offset-5">Curiosity</h1>
  <div class="ui-g ui-fluid">
      <div class="ui-g-12">
          <p-calendar [showIcon]="true" [selectOtherMonths]="true" [readonlyInput]="true" (onSelect)="onDateChanged($event)" [(ngModel)]="model" dateFormat="yy-mm-dd" [maxDate]="maxDate"></p-calendar>
      </div>
    
  
  
  <div *ngIf="pictures" class="ui-g-12">
      <ng-container *ngFor="let picture of pictures.photos">
      <img class="center" src="{{picture.img_src}}">
      </ng-container>
      <div *ngIf="pictures.photos.length == 0">
        <h1>No Photos Found</h1>
      </div>
    </div>
  
  </div>
    
    
  `
})
export class CuriosityComponent {
  socket: any;
  pictures: {};
  model: Date;
  maxDate: Date;
  constructor() {
    this.model = new Date();
    this.maxDate = new Date()
    this.socket = SocketService.getInstance();
    
    this.socket.on('send curiosity', (data) => {
      this.pictures = data;
    });
    let myDate = this.model.toISOString().split('T')[0]
    let last = parseInt(myDate.split('-')[2]);
    let str = myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;
    
    this.socket.emit('get curiosity', str );
  }
  
  onDateChanged(event): void {
    this.model = new Date(event);
    let myDate = this.model.toISOString().split('T')[0]
    this.socket.emit('get curiosity', myDate )
  }


}
