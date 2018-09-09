import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
	selector: 'app-enhanced',
	templateUrl: 'enhanced.component.html'
})
export class EnhancedComponent {
	socket: any;
	model: Date;
	maxDate: Date;
	enhancedImageLink;
	enhancedByDate;
	enhancedAvailable;
	isLoading: boolean = false;
	imageMsg: string;
	constructor(private _sharedService: SharedService) {}
	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('Enhanced');
		this.model = new Date();
		this.maxDate = new Date();
		this.socket = SocketService.getInstance();

		this.socket.on('send enhanced by date', data => {
			this.enhancedByDate = data;
			this.isLoading = false;
		});

		this.socket.on('send enhanced available', data => {
			this.enhancedAvailable = data;
			this.isLoading = false;
		});

		this.socket.on('send enhanced image', data => {
			this.enhancedImageLink = data;

			this.isLoading = false;
		});

		let myDate = this.model.toISOString().split('T')[0];
		let last = parseInt(myDate.split('-')[2]) - 1;
		let str =
			myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;

		this.socket.emit('get enhanced by date', str);
		this.socket.emit('get enhanced available');
	}
	onDateChanged(event): void {
		this.isLoading = true;
		this.model = new Date(event);
		let myDate = this.model.toISOString().split('T')[0];
		this.socket.emit('get enhanced by date', myDate);
	}

	getImage(image) {
		this.isLoading = true;
		this.socket.emit('get enhanced image', {
			image: image,
			date: this.model
		});
	}

	updateUrl(event) {
		this.imageMsg = 'No Image Available';
		this.enhancedImageLink = null;
	}
	open(image, date) {
		let myDate = new Date(date).toISOString().split('T')[0];

		let available = this.enhancedAvailable.find(el => {
			return el == myDate;
		});
		console.log(myDate, available);
		if (available) {
			this.getImage(image);
		} else {
			this.imageMsg = 'No Image Available';
		}
	}

	close() {
		this.enhancedImageLink = null;
	}

	imgLoaded() {
		console.log('loaded');
	}
}
