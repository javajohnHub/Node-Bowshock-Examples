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
	myDate;
	constructor(private _sharedService: SharedService) {}
	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('Enhanced');
		this.model = new Date();
		this.myDate = this.model.toISOString().split('T')[0];
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
		this.enhancedImageLink = [];
		this.socket.on('send enhanced image', data => {
			this.enhancedImageLink.push(data);

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
		this.myDate = this.model.toISOString().split('T')[0];
		this.socket.emit('get enhanced by date', this.myDate);
	}

	getImage(image) {
		this.isLoading = true;
		let arr = this.myDate.split('-');
		this.socket.emit('get enhanced image', {
			image: image,
			arr: arr
		});
	}

	updateUrl(event) {
		this.imageMsg = 'No Image Available';
	}
	open(image, date) {
		this.myDate = new Date(date).toISOString().split('T')[0];

		let available = this.enhancedAvailable.find(el => {
			return el == this.myDate;
		});

		if (available) {
			this.getImage(image);
		} else {
			this.imageMsg = 'No Image Available';
		}
	}

	close() {}

	imgLoaded() {}
}
