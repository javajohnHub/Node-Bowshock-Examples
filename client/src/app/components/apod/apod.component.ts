import { Component } from "@angular/core";
import { SocketService } from "../../shared/socket.service";
import { DomSanitizer } from "@angular/platform-browser";
import {of} from 'rxjs';
@Component({
  selector: "app-apod",
  template: `    
    <div class="ui-g-12">
      <h1>Apod</h1>
        <div class="ui-g-10 ui-g-offset-1">
        <p-calendar [(ngModel)]="model"></p-calendar>
            <!--<p-calendar (ngModelChange)="onDateChanged($event)" [(ngModel)]="model" dateFormat="yy-mm-dd" [maxDate]="maxDate"></p-calendar>-->
        </div>
      
    </div>
    <div *ngIf="apod">
      <h2>{{apod.title}}</h2>
      {{apod.copyright}} {{apod.date}}<br/>
      <div *ngIf="apod.media_type == 'image'">
      <img class="ui-fluid" src="{{apod.hdurl}}">
      </div>
      <div *ngIf="apod.media_type == 'video'" class="video-container">
        <iframe width='420' height='315'
                [src]='safe_url'>
        </iframe>
      </div><br/>
      {{apod.explanation}}<br/>
      
    </div>
  `,
  styles: [
    `
      .video-container {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 35px;
        height: 0;
        overflow: hidden;
      }
      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class ApodComponent {
  socket: any;
  apod: {};
  safe_url: any;
  model: Date;
  maxDate: Date;
  strDate;
  strDateChanged;
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(){
    this.model = new Date();
    console.log(this.model)
    this.socket = SocketService.getInstance();
    this.socket.on("send apod", data => {
      console.log('data', data)
      this.apod = data;
      this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.apod["url"]
      );
    });
    this.socket.emit("get apod", this.model)
  }

  onDateChanged(event): void {
    this.model = new Date(event);
    this.socket.emit("get apod",this.model)
  }
}
