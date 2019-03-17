import { Component } from '@angular/core';
import { SocketService } from '../../shared/socket.service';
import { SharedService } from '../../shared/shared.service';

@Component({
	selector: 'app-helioviewer',
	templateUrl: 'helioviewer.component.html'
})
export class HelioviewerComponent {
  socket: any;
  isLoading: boolean = false;
  movie;
  copy;
  constructor(
		private _sharedService: SharedService
  ) {}

  ngOnInit(){
    this._sharedService.subTitleSubject$.next('Helioviewer');
		this.socket = SocketService.getInstance();
		this.socket.on('send movie', movie => {
      this.isLoading = true;
			this.movie = movie;
			this.copy = JSON.parse(JSON.stringify(this.movie));
			this.isLoading = false;
    });

    this.socket.emit('get movie', {
      id: "F3Dh5",
      format: "mp4",
      height: 820,
      hq: true
      })
  }
}