import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-hss',
	templateUrl: 'hss.component.html'
})
export class HSSComponent {
	socket: any;
	hss: any; //HSS[];
	gst: any; //GST[];
	cme: any;
	ips: any;
	hssForm: FormGroup;

	startModel: Date = new Date(
		moment()
			.subtract(30, 'days')
			.format()
	);
	endModel: Date = new Date();
	maxStartDate: Date = new Date(
		moment()
			.subtract(30, 'days')
			.format()
	);
	maxEndDate: Date = new Date();
	isLoading: boolean = false;
	catalogs: SelectItem[];
	myKeyword: string;
	mySpeed: number;
	myHalfAngle: number;
	accurate: boolean = true;
	complete: boolean = true;
	selectedCatalog: string;
	sub: any;
	longDate;
	constructor(
		private _sharedService: SharedService,
		private _router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.isLoading = true;
		this._sharedService.subTitleSubject$.next('Hight Speed Stream');
		this.socket = SocketService.getInstance();
		this.socket.on('send hss', hss => {
			this.hss = hss;
			this.isLoading = false;
		});

		if (
			this.route.snapshot.params['startDate'] ||
			this.route.snapshot.params['id']
		) {
			this.sub = this.route.params.subscribe(params => {
				console.log(params);
				this.longDate = this.route.snapshot.params['id'];
				this.startModel = new Date(
					moment(params['startDate']).format('YYYY-MM-DD')
				);
				this.socket.emit('get hss', {
					startDate: moment(
						this.route.snapshot.params['startDate']
					).format('YYYY-MM-DD')
				});
			});
		} else {
			this.startModel = new Date(
				moment()
					.subtract(30, 'days')
					.format()
			);
			this.socket.emit('get hss', {
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
		console.log('change', event);
		if (
			this.route.snapshot.params['startDate'] ||
			this.route.snapshot.params['id']
		) {
			this._router.navigate(['donki/hss']);
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
			console.log('1');
			this.socket.emit('get hss', {
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
				this.endModel = new Date(
					moment()
						.subtract(30, 'days')
						.format()
				);
				console.log('2');
				this.socket.emit('get hss', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
				console.log({
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD')
				});
			} else {
				console.log('else');
				this.socket.emit('get hss', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
				console.log({
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
			}
		}
	}
}
