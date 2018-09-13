import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { SocketService } from '../../shared/socket.service';

@Component({
	selector: 'app-skymorph',
	templateUrl: './skymorph.component.html'
})
export class SkymorphComponent implements OnInit {
	socket: any;
	starData = [];
	isLoading: boolean;
	model: string;
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Skymorph');
		this.socket = SocketService.getInstance();
		this.socket.on('send star data', starData => {
			console.log(starData);
			this.starData = starData;
			// this.socket.emit('get star image', {
			//     key: this.starData
			// });
			this.isLoading = false;
		});
	}
	getData() {
		this.socket.emit('get star data', { query: this.model });
	}
}
