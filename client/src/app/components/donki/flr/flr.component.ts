import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import * as moment from 'moment';
@Component({
	selector: 'app-flr',
	templateUrl: 'flr.component.html'
})
export class FLRComponent {
	socket: any;
	flr: any; //FLR[];
	startModel: Date = new Date(
		moment()
			.subtract(30, 'days')
			.format()
	);
	endModel: Date = new Date(
		moment()
			.subtract(30, 'days')
			.format()
	);
	maxStartDate: Date = new Date(
		moment()
			.subtract(30, 'days')
			.format()
	);
	maxEndDate: Date = new Date(
		moment()
			.subtract(30, 'days')
			.format()
	);
	isLoading: boolean = false;
	cme;
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('DONKI/Solar Flare');
		this.socket = SocketService.getInstance();
		this.socket.on('send flr', flr => {
			this.flr = flr;
			this.cme = null;
			this.isLoading = false;
		});
		this.socket.on('send cme', cme => {
			this.cme = cme;
			this.flr = null;
			this.isLoading = false;
		});
		this.socket.emit('get flr', {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
		});
	}

	goToAssoc(date) {
		this.isLoading = true;

		let newDate = date.split('T');
		let type = date.split('-');
		this.startModel = new Date(moment(newDate[0]).format('YYYY-MM-DD'));
		this.socket.emit('get ' + type[3].toLowerCase(), {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
		});
	}

	setFLRDate() {
		this.isLoading = true;
		if (
			moment(this.startModel).format('YYYY-MM-DD') ==
			moment(this.endModel).format('YYYY-MM-DD')
		) {
			this.socket.emit('get flr', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
		}
		if (
			moment(this.startModel).format('YYYY-MM-DD') >
			moment(this.endModel).format('YYYY-MM-DD')
		) {
			this.endModel = new Date(
				moment()
					.subtract(30, 'days')
					.format()
			);
			this.socket.emit('get flr', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
		} else {
			this.socket.emit('get flr', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				endDate: moment(this.endModel).format('YYYY-MM-DD')
			});
		}
	}
}
