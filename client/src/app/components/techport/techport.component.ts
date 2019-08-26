import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { SocketService } from '../../shared/socket.service';

@Component({
	selector: 'app-techport',
	templateUrl: './techport.component.html'
})
export class TechportComponent implements OnInit {
	socket: any;
	isLoading: boolean;
  techport;
  id;
	constructor(
		private _sharedService: SharedService
	) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Techport');
		this.socket = SocketService.getInstance();
		this.socket.on('send techport', (response => {
      this.techport = response;
      this.isLoading = false;
    }))
	}

  getTechport(){
    this.isLoading = true;
    this.socket.emit('get techport', this.id)
  }
}
