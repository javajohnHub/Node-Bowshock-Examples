import { Component } from "@angular/core";
import { SocketService } from "../../shared/socket.service";
import { DomSanitizer } from "@angular/platform-browser";
import {of} from 'rxjs';
@Component({
  selector: "app-apod",
  template: `    
    <div class="ui-g">
      <h1>Apod</h1>
        <div class="ui-g-12">
            <p-calendar (onSelect)="onDateChanged($event)" [(ngModel)]="model" dateFormat="yy-mm-dd" [maxDate]="maxDate"></p-calendar>
        </div>
      
    </div>
    <div *ngIf="apod">
     

      <div *ngIf="apod.media_type == 'image'" style="position: 'relative'">
      <p-card title="{{apod.title}}" subtitle="{{apod.copyright}} {{apod.date}}" [style]="{position: 'absolute', width: '100%', top: 0,left: 0}" styleClass="ui-card-shadow">
      <p-header>
          <img src="Card" src="{{apod.hdurl}}">
      </p-header>
      <div>{{apod.explanation}}</div>
      <p-footer>
      </p-footer>
  </p-card>
      </div>
      <div *ngIf="apod.media_type == 'video'" class="video-container">
        <iframe width='420' height='315'
                [src]='safe_url'>
        </iframe>
       
      </div>
      
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
    this.socket = SocketService.getInstance();
    this.socket.on("send apod", data => {
      this.apod = data;
      this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.apod["url"]
      );
    });
    let myDate = this.model.toISOString().split('T')[0]
    let last = parseInt(myDate.split('-')[2]) -1;
    let today = last + 1;
    let str = myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;
    this.maxDate = new Date(myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + today)
    this.socket.emit("get apod", str)
  }

  onDateChanged(event): void {
    this.model = new Date(event);
    let myDate = this.model.toISOString().split('T')[0]
    this.socket.emit("get apod", myDate)
  }
}
