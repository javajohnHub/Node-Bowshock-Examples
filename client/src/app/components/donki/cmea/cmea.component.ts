import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MenuItem, SelectItem } from 'primeng/api';

export interface CMEA {
	time21_5: string;
	latitude: number;
	longitude: number;
	halfAngle: number;
	speed: number;
	type: string;
	isMostAccurate: boolean;
	associatedCMEID: string;
	note: string;
	catalog: string;
}

@Component({
	selector: 'app-cmea',
	templateUrl: 'cmea.component.html'
})
export class CMEAComponent {
	socket: any;
	cmea: CMEA[];
	cmeaForm: FormGroup;
	mostAccurateOnlyToggle: boolean = true;
	completeEntryOnlyToggle: boolean = true;
	selectedCatalog: string;
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
	catalogs: SelectItem[];
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this.isLoading = true;
		this.catalogs = [
			{ label: 'Select Catalog', value: 'ALL' },
			{ label: 'ALL', value: 'ALL' },
			{ label: 'SWRC_CATALOG', value: 'SWRC_CATALOG' },
			{ label: 'JANG_ET_AL_CATALOG', value: 'JANG_ET_AL_CATALOG' }
		];
		this._createForm();
		this._sharedService.subTitleSubject$.next(
			'DONKI/Coronal Mass Ejection Analysis'
		);
		this.socket = SocketService.getInstance();
		this.socket.on('send cmea', cmea => {
			this.cmea = cmea;
			this.isLoading = false;
		});

		this.socket.emit('get cmea', {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
		});
	}

	private _createForm() {
		this.cmeaForm = new FormGroup({
			keyword: new FormControl(''),
			speed: new FormControl(0),
			halfAngle: new FormControl(0),
			catalogs: new FormControl(''),
			complete: new FormControl(true),
			accurate: new FormControl(true)
		});
	}

	completeChanged(event) {
		console.log('complete', event);
	}
	accurateChanged(event) {
		console.log('accurate', event);
	}

	catalogSelected(catalog) {
		console.log('catalog', catalog);
	}
	goToAssoc(date) {
		this.isLoading = true;

		let newDate = date.split('T');
		this.startModel = new Date(moment(newDate[0]).format('YYYY-MM-DD'));
		this.socket.emit('get cmea', {
			startDate: moment(newDate[0]).format('YYYY-MM-DD')
		});
	}

	setCMEADate() {
		this.isLoading = true;
		if (
			moment(this.startModel).format('YYYY-MM-DD') ==
			moment(this.endModel).format('YYYY-MM-DD')
		) {
			this.socket.emit('get cmea', {
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
			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});
		} else {
			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				endDate: moment(this.endModel).format('YYYY-MM-DD')
			});
		}
	}

	get keyword() {
		return this.cmeaForm.get('keyword');
	}

	get speed() {
		return this.cmeaForm.get('speed');
	}

	get halfAngle() {
		return this.cmeaForm.get('halfAngle');
	}

	get complete() {
		return this.cmeaForm.get('completeEntryOnly');
	}

	get accurate() {
		return this.cmeaForm.get('mostAccurateOnly');
	}

	get catalogsControl() {
		return this.cmeaForm.get('catalogs');
	}
}
