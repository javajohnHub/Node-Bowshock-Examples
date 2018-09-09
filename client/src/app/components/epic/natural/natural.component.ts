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
	naturalImageLink;
	naturalByDate;
	naturalAvailable;
	isLoading: boolean = false;
	constructor(private _sharedService: SharedService) {}
	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('Natural');
		this.model = new Date();
		this.maxDate = new Date();
		this.socket = SocketService.getInstance();

		this.socket.on('send natural by date', data => {
			this.naturalByDate = data;
			this.isLoading = false;
		});

		this.socket.on('send natural all', data => {
			this.naturalAvailable = data;
			console.log(this.naturalAvailable);
			this.isLoading = false;
		});

		this.socket.on('send natural available', data => {
			this.naturalImageLink = data;

			this.isLoading = false;
		});

		let myDate = this.model.toISOString().split('T')[0];
		let last = parseInt(myDate.split('-')[2]) - 1;
		let str =
			myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;

		this.socket.emit('get natural by date', str);
		this.socket.emit('get natural available');
	}
	onDateChanged(event): void {
		this.isLoading = true;
		this.model = new Date(event);
		let myDate = this.model.toISOString().split('T')[0];
		this.socket.emit('get natural by date', myDate);
	}

	getImage(image) {
		this.isLoading = true;
		this.socket.emit('get natural image', {
			image: image,
			date: this.model
		});
	}

	open(image) {
		this.getImage(image);
	}

	close() {
		this.naturalImageLink = null;
	}

	imgLoaded() {
		console.log('loaded');
	}
}
