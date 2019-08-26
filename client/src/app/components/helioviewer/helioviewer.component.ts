import { Component } from '@angular/core';
import { SocketService } from '../../shared/socket.service';
import { SharedService } from '../../shared/shared.service';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-helioviewer',
	templateUrl: 'helioviewer.component.html'
})
export class HelioviewerComponent {
	socket: any;
	isLoading: boolean = false;
  url;
  id;
	constructor(
		private _sharedService: SharedService,
		private _fb: FormBuilder
	) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Helioviewer');
		this.socket = SocketService.getInstance();
    this.socket.on('send url', url => {
      this.url =url;
    })

		this.isLoading = false;
	}

  chooseMovie(){
    this.socket.emit('play movie', {id: this.id,
    format: "mp4",
    height: 820,
    hq: true,
    })
  }

}
