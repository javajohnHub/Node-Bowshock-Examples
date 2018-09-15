import { Component, Input } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { SocketService } from '../../../../shared/socket.service';

@Component({
	selector: 'app-event',
	templateUrl: 'event.component.html'
})
export class EventComponent {
	socket: any;
	@Input('event')
	event: any;
	imageUrl: any = [];
	isLoading: boolean = false;
	geos = [];
	tileDimension = 0.145;
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next(
			'The Earth Observatory Natural Event Tracker/Event'
		);
		this.isLoading = true;
		this.socket = SocketService.getInstance();

		this.socket.on('send earth imagery', imageUrl => {
			this.imageUrl = imageUrl;
			this.isLoading = false;
		});
	}

	getImages(geo) {
		this.isLoading = true;
		this.socket.emit('get earth imagery', {
			lon: geo.coordinates[0],
			lat: geo.coordinates[1],
			dim: this.tileDimension
		});
	}
}
