import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';

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
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this.isLoading = true;

		this._sharedService.subTitleSubject$.next('Hight Speed Stream');
		this.socket = SocketService.getInstance();
		this.socket.on('send hss', hss => {
			this.hss = hss;
			this.gst = null;
			this.ips = null;
			this.isLoading = false;
		});

		this.socket.on('send gst', gst => {
			this.gst = gst;
			this.hss = null;
			this.ips = null;
			this.isLoading = false;
		});
		this.socket.on('send ips', ips => {
			this.gst = null;
			this.hss = null;
			this.ips = ips;
			this.isLoading = false;
		});
		this.socket.emit('get hss', {
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
