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
		this.socket.emit('get events');
	}

	open() {
		console.log('opened');
	}
}
