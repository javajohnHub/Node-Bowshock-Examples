import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-gst',
	templateUrl: 'gst.component.html'
})
export class GSTComponent {
	socket: any;
	gst: any; //GST[];
	startModel: Date;
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
	sub: any;
	constructor(
		private _sharedService: SharedService,
		private _router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('Geomagnetic Storm');
		this.socket = SocketService.getInstance();
		this.socket.on('send gst', gst => {
			this.gst = gst;
			this.isLoading = false;
		});
		this.startModel = new Date(
			moment()
				.subtract(30, 'days')
				.format()
		);
		this.socket.emit('get gst', {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
		});

		this.sub = this.route.params.subscribe(params => {
			console.log(params);
			this.startModel = new Date(
				moment(params['startDate']).format('YYYY-MM-DD')
			);
			this.socket.emit('get gst', {
				startDate: moment(params['startDate']).format('YYYY-MM-DD')
			});
		});
	}

	goToAssoc(date) {
		this.isLoading = true;

		let newDate = date.split('T');
		let type = date.split('-');
		this.startModel = new Date(moment(newDate[0]).format('YYYY-MM-DD'));
		this._router.navigate([
			'donki/' + type[3].toLowerCase() + '/',
			moment(this.startModel).format('YYYY-MM-DD')
		]);
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
