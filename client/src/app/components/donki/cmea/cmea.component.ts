import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-cmea',
	templateUrl: 'cmea.component.html'
})
export class CMEAComponent {
	socket: any;
	cmea: any;
	complete;
	accurate;
	speed;
	halfAngle;
	cmeaForm: FormGroup;
	catalogs;
	selectedCatalog: string;
	startModel: Date;
	endModel: Date = new Date();
	maxStartDate: Date;
	maxEndDate: Date = new Date();
	isLoading: boolean = false;
	sub: any;
	longDate;
	constructor(
		private _sharedService: SharedService,
		private _router: Router,
		private route: ActivatedRoute,
		private _fb: FormBuilder
	) {}

	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next(
			'Coronal Mass Ejection Analysis'
		);
		this.socket = SocketService.getInstance();
		this.socket.on('send cmea', cmea => {
			console.log('cmea', cmea);
			this.cmea = cmea;
			this.isLoading = false;
		});

		console.log(this.route);
		if (
			this.route.snapshot.params['startDate'] ||
			this.route.snapshot.params['id']
		) {
			this.longDate = this.route.snapshot.params['id'];
			console.log('params', this.longDate);
			this.startModel = new Date(
				moment(this.route.snapshot.params['startDate']).format(
					'YYYY-MM-DD'
				)
			);
			this.socket.emit('get cmea', {
				startDate: moment(
					this.route.snapshot.params['startDate']
				).format('YYYY-MM-DD')
			});
			this.sub = this.route.params.subscribe(params => {});
		} else {
			console.log('else no params');
			this.startModel = new Date(
				moment()
					.subtract(30, 'days')
					.format()
			);
			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
		}
		this._createForm();
	}

	private _createForm() {
		this.cmeaForm = this._fb.group({
			startDate: [this.maxStartDate],
			endDate: [this.endModel],
			mostAccurateOnly: [this.accurate],
			completeEntryOnly: [this.complete],
			speed: [this.speed],
			halfAngle: [this.halfAngle],
			catalogs: ['ALL'],
			keyword: ['NONE']
		});
	}
	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}
	change(event) {
		console.log('change', event);
		if (
			this.route.snapshot.params['startDate'] ||
			this.route.snapshot.params['id']
		) {
			this._router.navigate(['donki/cmea']);
		}
	}
	goToAssoc(date) {
		this.isLoading = true;

		let newDate = date.split('T');
		let type = date.split('-');
		this.startModel = new Date(moment(newDate[0]).format('YYYY-MM-DD'));
		this.socket.emit('get ' + type[3].toLowerCase(), {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
		});
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
			console.log('1');
			this.socket.emit('get cmea', {
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
				this.socket.emit('get cmea', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
				console.log({
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD')
				});
			} else {
				console.log('else');
				this.socket.emit('get cmea', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
				console.log({
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
			}
		}
	}
}
