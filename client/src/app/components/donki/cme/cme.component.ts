import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-cme',
	templateUrl: 'cme.component.html'
})
export class CMEComponent {
	socket: any;
	cme: any;
	endModel: Date = new Date();
	maxStartDate: Date = new Date(
		moment()
			.subtract(30, 'days')
			.format()
	);
	maxEndDate: Date = new Date();
	isLoading: boolean = false;
	sub: any;
	startModel: Date;
	longDate: string = '';
	constructor(
		private _sharedService: SharedService,
		private _router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('Coronal Mass Ejection');
		this.socket = SocketService.getInstance();
		this.socket.on('send cme', cme => {

			this.cme = cme;
			this.isLoading = false;
		});

		if (
			this.route.snapshot.params['startDate'] ||
			this.route.snapshot.params['id']
		) {
			this.longDate = this.route.snapshot.params['id'];

			this.startModel = new Date();
			this.socket.emit('get cme', {
				startDate: moment(
					this.route.snapshot.params['startDate']
				).format('YYYY-MM-DD')
			});
			this.sub = this.route.params.subscribe(params => {});
		} else {

			this.startModel = new Date(
				moment()
					.subtract(30, 'days')
					.format()
			);
			this.socket.emit('get cme', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
		}
	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	change(event) {

		if (
			this.route.snapshot.params['startDate'] ||
			this.route.snapshot.params['id']
		) {
			this._router.navigate(['donki/cme']);
		}
	}
	goToAssoc(date) {
		this.isLoading = true;
		let newDate = date.split('T');

		let type = date.split('-');
		this.startModel = new Date(moment(newDate[0]).format('YYYY-MM-DD'));
		this._router.navigate([
			'donki/' +
				type[3].toLowerCase() +
				'/' +
				moment(this.startModel).format('YYYY-MM-DD') +
				'/' +
				date
		]);
	}

	setOptions() {
		if (
			moment(this.startModel).format('YYYY-MM-DD') ==
			moment(this.endModel).format('YYYY-MM-DD')
		) {

			this.socket.emit('get cme', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});

		} else {
			if (
				moment(this.startModel).format('YYYY-MM-DD') >
				moment(this.endModel).format('YYYY-MM-DD')
			) {
				this.endModel = new Date();

				this.socket.emit('get cme', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});

			} else {

				this.socket.emit('get cme', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});

			}
		}
	}
}
