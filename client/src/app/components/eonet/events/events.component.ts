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

	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next(
			'The Earth Observatory Natural Event Tracker/Events'
		);
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('send events', events => {
			this.events = events;
			this.isLoading = false;
		});

		this.socket.on('send earth imagery', imageUrl => {
			this.imageUrl = imageUrl;
			this.isLoading = false;
		});

		this.socket.emit('get events');
	}

	getImages(geometries, x) {
		console.log(geometries[x]);
		this.socket.emit('get earth imagery', {
			lon: geometries[x].coordinates[0],
			lat: geometries[x].coordinates[1]
		});
	}
}
