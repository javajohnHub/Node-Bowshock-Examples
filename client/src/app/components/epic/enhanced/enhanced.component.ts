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
	enhancedAll;
	enhancedSingle;
	constructor(private _sharedService: SharedService) {}
	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Enhanced');
		this.model = new Date();
		this.maxDate = new Date();
		this.socket = SocketService.getInstance();
		this.socket.on('send enhanced all', data => {
			this.enhancedAll = data;
			this.enhancedSingle = null;
		});
		this.socket.on('send enhanced by date', data => {
			this.enhancedSingle = data;
			this.enhancedAll = null;
		});
		let myDate = this.model.toISOString().split('T')[0];
		let last = parseInt(myDate.split('-')[2]) - 1;
		let str =
			myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;

		this.socket.emit('get enhanced all', str);
	}
	onDateChanged(event): void {
		this.model = new Date(event);
		let myDate = this.model.toISOString().split('T')[0];
		this.socket.emit('get enhanced by date', myDate);
	}
}
