import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {DomSanitizer} from "@angular/platform-browser";

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
      <div *ngIf="apod.media_type == 'image'">
      <img class="img-responsive" src="{{apod.hdurl}}">
      </div>
      <div *ngIf="apod.media_type == 'video'" class="video-container">
        <iframe width="420" height="315"
                [src]="safe_url">
        </iframe>
      </div><br/>
      {{apod.explanation}}<br/>
      
    </div>
  `,
  styles: [`
    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      padding-top: 35px;
      height: 0;
      overflow: hidden;
    }
    .video-container iframe {
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
    }`]
})
export class ApodComponent {
  socket: any;
  apod: {};
  safe_url: any;
  myOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  model: Object = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };

  constructor(private sanitizer: DomSanitizer) {
    this.socket = SocketService.getInstance();
    this.socket.on('send apod', (data) => {
      this.apod = JSON.parse(data);
      this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.apod['url']);
    });
    this.socket.emit('get apod', this.model['date'] );
  }
  onDateChanged(event: IMyDateModel): void {
    this.socket.emit('get apod', event.date );
  }

}
