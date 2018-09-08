import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
	selector: 'app-natural',
	templateUrl: 'natural.component.html'
})
export class NaturalComponent {
	socket: any;
	model: Date;
	maxDate: Date;
	natural;
	naturalAll;
	naturalByDate;
	naturalAvailable;
	constructor(private _sharedService: SharedService) {}
	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Natural');
		this.model = new Date();
		this.maxDate = new Date();
		this.socket = SocketService.getInstance();
		this.socket.on('send natural all', data => {
			this.naturalAll = data;
			// this.natural = null;
			// this.naturalByDate = null;
			// this.naturalAvailable = null;
		});
		this.socket.on('send natural by date', data => {
			this.naturalByDate = data;
			// this.naturalAll = null;
			// this.natural = null;
			// this.naturalAvailable = null;
		});

		this.socket.on('send natural', data => {
			this.natural = data;
			// this.naturalAll = null;
			// this.naturalByDate = null;
			// this.naturalAvailable = null;
		});

		this.socket.on('send natural available', data => {
			this.naturalAvailable = data;
			// this.natural = null;
			// this.naturalAll = null;
			// this.naturalByDate = null;
		});
		let myDate = this.model.toISOString().split('T')[0];
		let last = parseInt(myDate.split('-')[2]) - 1;
		let str =
			myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;

		this.socket.emit('get natural');
		this.socket.emit('get natural all');
		this.socket.emit('get natural available');
		this.socket.emit('get natural by date', str);
	}
	onDateChanged(event): void {
		this.model = new Date(event);
		let myDate = this.model.toISOString().split('T')[0];
		this.socket.emit('get natural by date', myDate);
	}
}
