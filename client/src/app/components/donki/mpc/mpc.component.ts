import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';

@Component({
	selector: 'app-mpc',
	templateUrl: 'mpc.component.html'
})
export class MPCComponent {
	socket: any;
	hss: any; //HSS[];
	gst: any; //GST[];
	cme: any;
	ips: any;
	mpc: any;
	rbe: any;
	ipsForm: FormGroup;
	catalogs: SelectItem[];
	location: String;
	selectedCatalog: string;
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
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this.isLoading = true;
		this.catalogs = [
			{ label: 'Select Catalog', value: 'ALL' },
			{ label: 'ALL', value: 'ALL' },
			{ label: 'SWRC_CATALOG', value: 'SWRC_CATALOG' },
			{ label: 'JANG_ET_AL_CATALOG', value: 'JANG_ET_AL_CATALOG' }
		];
		this._sharedService.subTitleSubject$.next('Magnetopause Crossing');
		this.socket = SocketService.getInstance();
		this.socket.on('send ips', ips => {
			this.ips = ips;
			this.gst = null;
			this.hss = null;
			this.mpc = null;
			this.rbe = null;
			this.cme = null;
			this.isLoading = false;
		});

		this.socket.on('send gst', gst => {
			this.gst = gst;
			this.hss = null;
			this.ips = null;
			this.mpc = null;
			this.cme = null;
			this.isLoading = false;
		});

		this.socket.on('send hss', hss => {
			this.hss = hss;
			this.gst = null;
			this.ips = null;
			this.mpc = null;
			this.rbe = null;
			this.cme = null;
			this.isLoading = false;
		});

		this.socket.on('send mpc', mpc => {
			this.mpc = mpc;
			this.gst = null;
			this.ips = null;
			this.hss = null;
			this.rbe = null;
			this.cme = null;
			this.isLoading = false;
		});

		this.socket.on('send rbe', rbe => {
			this.rbe = rbe;
			this.gst = null;
			this.ips = null;
			this.hss = null;
			this.mpc = null;
			this.cme = null;
			this.isLoading = false;
		});

		this.socket.on('send cme', cme => {
			this.cme = cme;
			this.gst = null;
			this.ips = null;
			this.hss = null;
			this.mpc = null;
			this.rbe = null;
			this.isLoading = false;
		});
		this.socket.emit('get mpc', {
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

	setOptions() {
		if (
			moment(this.startModel).format('YYYY-MM-DD') ==
			moment(this.endModel).format('YYYY-MM-DD')
		) {
			console.log('1');
			this.socket.emit('get mpc', {
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
				this.socket.emit('get mpc', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});
				console.log({
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD')
				});
			} else {
				console.log('else');
				this.socket.emit('get mpc', {
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
