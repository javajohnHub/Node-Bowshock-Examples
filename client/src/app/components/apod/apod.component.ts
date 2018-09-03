import { Component } from "@angular/core";
import { SocketService } from "../../shared/socket.service";
import { DomSanitizer } from "@angular/platform-browser";
import { SharedService } from "../../shared/shared.service";

@Component({
  selector: "app-apod",
  templateUrl: 'apod.component.html',
  styles: [
`
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
  constructor(private sanitizer: DomSanitizer, private _sharedService: SharedService) {
  }

  ngOnInit(){
    this._sharedService.subTitleSubject$.next('Astronomy Picture of the Day')
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
    this.maxDate = new Date(myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last)
    this.socket.emit('get apod', str );
  }

  onDateChanged(event): void {
    this.model = new Date(event);
    let myDate = this.model.toISOString().split('T')[0]
    this.socket.emit("get apod", myDate)
  }
}
