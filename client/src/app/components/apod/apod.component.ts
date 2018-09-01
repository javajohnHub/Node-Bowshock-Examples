import { Component } from "@angular/core";
import { SocketService } from "../../shared/socket.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-apod",
  template: `  
  <div class="ui-g">
  
    <div class="ui-g-12">
    <h1 class="ui-xl-4 ui-lg-6 ui-md-10 ui-sm-12 ui-md-offset-3 ui-lg-offset-4 ui-xl-offset-4">Apod</h1>
    <div class="ui-xl-4 ui-lg-6 ui-md-10 ui-sm-12 ui-md-offset-3 ui-lg-offset-4 ui-xl-offset-4">
      <p-calendar [showIcon]="true" [selectOtherMonths]="true" [readonlyInput]="true" (onSelect)="onDateChanged($event)" [(ngModel)]="model" dateFormat="yy-mm-dd" [maxDate]="maxDate"></p-calendar>
    </div>
      </div>
    <div *ngIf="apod" class="ui-g-12">
     
    
      <div *ngIf="apod.media_type == 'image'" style="position: relative" >
      <p-card title="{{apod.title}}" subtitle="{{apod.copyright}} {{apod.date}}" styleClass="center">
      <p-header class="square">
          <img class="center" src="{{apod.hdurl}}">
      </p-header>
      <div>{{apod.explanation}}</div>
  </p-card>
      </div>
      <div *ngIf="apod.media_type == 'video'" class="video-container">
        <p-card title="{{apod.title}}" subtitle="{{apod.copyright}} {{apod.date}}" styleClass="center">
        <p-header class="square">
        <iframe class="center"
        [src]='safe_url'>
</iframe>
        </p-header>
        <div style="height: 100%;">{{apod.explanation}}</div>
    </p-card>
    </div>
   
  `,
  styles: [
    `
      .video-container {
        
        
    
      }
      .video-container iframe {
        
        width: 100%;
        height: 100%
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
    let last = parseInt(myDate.split('-')[2]);
    let str = myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;
    
    this.socket.emit('get apod', str );
  }

  onDateChanged(event): void {
    this.model = new Date(event);
    let myDate = this.model.toISOString().split('T')[0]
    this.socket.emit("get apod", myDate)
  }
}
