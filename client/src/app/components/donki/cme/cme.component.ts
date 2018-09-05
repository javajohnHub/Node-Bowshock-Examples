import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import * as moment from 'moment';
export interface Instruments {
	id: number;
	displayName: string;
}

export interface CMEAnalyses {
	time21_5: string;
	latitude: number;
	longitude: number;
	halfAngle: number;
	speed: number;
	type: string;
	isMostAccurate: boolean;
	note: string;
	levelOfData: number;
	enlilList: any;
}
export interface CME {
	activityId: Date;
	startTime: Date;
	sourceLocation: string;
	activeRegionNum: number;
	instruments: Instruments[];
	cmeAnalyses: CMEAnalyses[];
	linkedEvents: any;
	note: string;
	catalog: string;
}
@Component({
	selector: 'app-cme',
	templateUrl: 'cme.component.html'
})
export class CMEComponent {
	socket: any;
	cme: CME[];
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
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('Coronal Mass Ejection');
		this.socket = SocketService.getInstance();
		this.socket.on('send cme', cme => {
			this.cme = cme;
			this.isLoading = false;
		});
		this.socket.emit('get cme', {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
		});
	}

	setCMEDate() {
		this.isLoading = true;
		if (
			moment(this.startModel).format('YYYY-MM-DD') ==
			moment(this.endModel).format('YYYY-MM-DD')
		) {
			this.socket.emit('get cme', {
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
			this.socket.emit('get cme', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
		} else {
			this.socket.emit('get cme', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				endDate: moment(this.endModel).format('YYYY-MM-DD')
			});
		}
	}
}
