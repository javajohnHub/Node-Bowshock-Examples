import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
	socket: any;
	isLoading: boolean;
	media;
	model;
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Skymorph');
		this.socket = SocketService.getInstance();
		this.socket.on('send media', media => {
			this.media = media;
			this.isLoading = false;
		});
	}
	getData() {
		this.isLoading = true;
		this.socket.emit('get star data', { target: this.model });
	}
}
