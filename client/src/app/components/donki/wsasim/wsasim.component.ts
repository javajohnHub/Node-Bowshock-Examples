import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-wsasim',
	templateUrl: 'wsasim.component.html'
})
export class WSASimComponent {
	socket: any;
	wsasim: any;
	startModel: Date;
	endModel: Date = new Date();
	maxStartDate: Date = new Date(
		moment()
			.subtract(7, 'days')
			.format()
	);
	maxEndDate: Date = new Date();
	isLoading: boolean = false;
	sub: any;
	longDate;
	constructor(
		private _sharedService: SharedService,
		private _router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('WSA + Enlil Simulation');
		this.socket = SocketService.getInstance();
		this.socket.on('send wsasim', wsasim => {
			this.wsasim = wsasim;
			this.isLoading = false;
		});

		this.startModel = new Date(
			moment()
				.subtract(7, 'days')
				.format()
		);
		this.socket.emit('get wsasim', {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
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

	setOptions() {
		if (
			moment(this.startModel).format('YYYY-MM-DD') ==
			moment(this.endModel).format('YYYY-MM-DD')
		) {
			this.socket.emit('get wsasim', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
		} else {
			if (
				moment(this.startModel).format('YYYY-MM-DD') >
				moment(this.endModel).format('YYYY-MM-DD')
			) {
				this.endModel = new Date();

				this.socket.emit('get wsasim', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
			} else {
				this.socket.emit('get wsasim', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
			}
		}
	}
}
