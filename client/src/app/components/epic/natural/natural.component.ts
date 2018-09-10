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
	imageMsg: string;
	myDate;
	constructor(private _sharedService: SharedService) {}
	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('Natural');
		this.model = new Date();
		this.myDate = this.model.toISOString().split('T')[0];
		this.maxDate = new Date();
		this.socket = SocketService.getInstance();

		this.socket.on('send natural by date', data => {
			this.naturalByDate = data;
			this.isLoading = false;
		});

		this.socket.on('send natural available', data => {
			this.naturalAvailable = data;
			this.isLoading = false;
		});
		this.naturalImageLink = [];
		this.socket.on('send natural image', data => {
			this.naturalImageLink.push(data);

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
		this.myDate = this.model.toISOString().split('T')[0];
		this.socket.emit('get natural by date', this.myDate);
	}

	getImage(image) {
		this.isLoading = true;
		let arr = this.myDate.split('-');
		this.socket.emit('get natural image', {
			image: image,
			arr: arr
		});
	}

	updateUrl(event) {
		this.imageMsg = 'No Image Available';
	}
	open(image, date) {
		this.myDate = new Date(date).toISOString().split('T')[0];

		let available = this.naturalAvailable.find(el => {
			return el == this.myDate;
		});
		console.log(this.myDate, available);
		if (available) {
			this.getImage(image);
		} else {
			this.imageMsg = 'No Image Available';
		}
	}

	close() {}

	imgLoaded() {
		console.log('loaded');
	}
}
