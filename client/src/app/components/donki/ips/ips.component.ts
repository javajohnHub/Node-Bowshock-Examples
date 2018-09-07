import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-ips',
	templateUrl: 'ips.component.html'
})
export class IPSComponent {
	socket: any;
	ips: any;
	ipsForm: FormGroup;
	catalogs: SelectItem[];
	location: String;
	selectedCatalog: string;
	startModel: Date;
	endModel: Date = new Date();
	maxStartDate: Date = new Date(
		moment()
			.subtract(30, 'days')
			.format()
	);
	maxEndDate: Date = new Date();
	isLoading: boolean = false;
	sub: any;
	constructor(
		private _sharedService: SharedService,
		private _fb: FormBuilder,
		private route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('Interplanetary Shock');
		this.socket = SocketService.getInstance();
		this.socket.on('send ips', ips => {
			this.ips = ips;
			this.isLoading = false;
		});
		this.startModel = new Date(
			moment()
				.subtract(30, 'days')
				.format()
		);
		this.socket.emit('get ips', {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
		});

		this.sub = this.route.params.subscribe(params => {
			console.log(params);
			this.startModel = new Date(
				moment(params['startDate']).format('YYYY-MM-DD')
			);
			this.socket.emit('get ips', {
				startDate: moment(params['startDate']).format('YYYY-MM-DD')
			});
		});
		this._createForm();
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
	private _createForm() {
		this.ipsForm = this._fb.group({
			location: ['Earth'],
			catalogs: ['ALL']
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
			console.log('1');
			this.socket.emit('get ips', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
			console.log({
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
		} else {
			if (
				moment(this.startModel).format('YYYY-MM-DD') >
				moment(this.endModel).format('YYYY-MM-DD')
			) {
				this.endModel = new Date();
				console.log('2');
				this.socket.emit('get ips', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
				console.log({
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD')
				});
			} else {
				console.log('else');
				this.socket.emit('get ips', {
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD')
				});
				console.log({
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD')
				});
			}
		}
	}
}
