import { Component } from '@angular/core';
import { SocketService } from '../../shared/socket.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-apod',
  template: `    
    <div class="ui-g-12">
      <h1>Apod</h1>
      <form>
        <div class="ui-g-10 ui-g-offset-1">
            <p-calendar [(ngModel)]="model" name="apodDate"></p-calendar>
        </div>
      </form>
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
  model: Object = {};

  constructor(private sanitizer: DomSanitizer) {
    this.model = {
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      }
    };
    this.socket = SocketService.getInstance();
    this.socket.on('send apod', data => {
      this.apod = data;
      this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.apod['url']
      );
    });
    console.log(this.model['date'])
    this.socket.emit('get apod', this.model['date']);
  }
  onDateChanged(event): void {
    console.log(event.date)
    this.socket.emit('get apod', event.date);
  }
}
