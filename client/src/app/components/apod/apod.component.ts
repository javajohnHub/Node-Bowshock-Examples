import { Component } from "@angular/core";
import { SocketService } from "../../shared/socket.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-apod",
  template: `    
    <div class="ui-g-12">
      <h1>Apod</h1>
     
        <div class="ui-g-10 ui-g-offset-1">
            <p-calendar showButtonBar="true" [(ngModel)]="model" dateFormat="yy.mm.dd" [maxDate]="model"></p-calendar>
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
  model: string;
  maxDateValue: Date;
  constructor(private sanitizer: DomSanitizer) {
    const year: number = new Date().getFullYear();
    const month: number = new Date().getMonth() + 1;
    const day: number = new Date().getDate();
    this.model = this.getTodaysDate().toString();
    console.log(this.model);
    // this.socket = SocketService.getInstance();
    // this.socket.on("send apod", data => {
    //   this.apod = data;
    //   this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(
    //     this.apod["url"]
    //   );
    // });

    // this.socket.emit("get apod", this.model);
  }
  onDateChanged(event): void {
    console.log(event.date);
    //this.socket.emit("get apod", event.date);
  }

  getTodaysDate() {
    const myDate = new Date();
    const myYear = myDate.getFullYear();
    const myMonth = myDate.getMonth() + 1;
    const day = myDate.getDate();
    let stringMonth;
    let stringDay;
    if (day < 10) {
      stringDay = '0' + day;
    }
    if (myMonth < 10) {
      stringMonth = '0' + myMonth;
    }

    return `${myYear} + "-" + ${stringMonth || myMonth} + "-" + ${stringDay || day}`;
  }
}
