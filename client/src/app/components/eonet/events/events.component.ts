import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-events',
	templateUrl: 'events.component.html'
})
export class EventsComponent {
	socket: any;
	events: any = {};
	imageUrl: any = [];
	isLoading: boolean = false;
	geos = [];
	tileDimension = 0.145;
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next(
			'The Earth Observatory Natural Event Tracker/Events'
		);
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('send events', events => {
			console.log(events);
			this.events = events.events;
			this.events.forEach(event => {
				this.geos.push(event.geometries);
			});
			this.isLoading = false;
		});

		this.socket.on('send earth imagery', imageUrl => {
			this.imageUrl.push(imageUrl);
			this.isLoading = false;
			console.log('i', this.imageUrl);
		});

		this.socket.emit('get events');
	}

	open() {
		console.log('opened');
		this.imageUrl = [];
	}
	getImages(geo) {
		this.socket.emit('get earth imagery', {
			lon: geo.coordinates[0],
			lat: geo.coordinates[1],
			dim: this.tileDimension
		});
	}
}
