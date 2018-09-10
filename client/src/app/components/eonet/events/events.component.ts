import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-events',
	templateUrl: 'events.component.html'
})
export class EventsComponent {
	socket: any;
	events = [];
	isLoading: boolean = false;

	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next(
			'The Earth Observatory Natural Event Tracker/Events'
		);
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('recieve events', events => {
			this.events = events;
			this.isLoading = false;
		});

		this.socket.emit('request events');
	}
}
