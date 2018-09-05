import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import * as moment from 'moment';
@Component({
	selector: 'app-gst',
	templateUrl: 'gst.component.html'
})
export class GSTComponent {
	socket: any;
	gst: any; //GST[];
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
		this._sharedService.subTitleSubject$.next('Geomagnetic Storm');
		this.socket = SocketService.getInstance();
		this.socket.on('send gst', gst => {
			this.gst = gst;
			this.cme = null;
			this.isLoading = false;
		});
		this.socket.on('send cme', cme => {
			this.cme = cme;
			this.gst = null;
			this.isLoading = false;
		});
		this.socket.emit('get gst', {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
		});
	}

	goToAssoc(date) {
		this.isLoading = true;

		let newDate = date.split('T');
		this.startModel = new Date(moment(newDate[0]).format('YYYY-MM-DD'));
		this.socket.emit('get cme', {
			startDate: moment(newDate[0]).format('YYYY-MM-DD')
		});
	}

	setGSTDate() {
		this.isLoading = true;
		if (
			moment(this.startModel).format('YYYY-MM-DD') ==
			moment(this.endModel).format('YYYY-MM-DD')
		) {
			this.socket.emit('get gst', {
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
			this.socket.emit('get gst', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
		} else {
			this.socket.emit('get gst', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				endDate: moment(this.endModel).format('YYYY-MM-DD')
			});
		}
	}
}
