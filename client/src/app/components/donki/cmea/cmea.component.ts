import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CME } from '../cme/cme.component';

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
	cme: CME[];
	cmeaForm: FormGroup;

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
	myKeyword: string;
	mySpeed: number;
	myHalfAngle: number;
	accurate: boolean = true;
	complete: boolean = true;
	selectedCatalog: string;
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
			'Coronal Mass Ejection Analysis'
		);
		this.socket = SocketService.getInstance();
		this.socket.on('send cmea', cmea => {
			this.cmea = cmea;
			this.cme = null;
			this.isLoading = false;
		});

		this.socket.on('send cme', cme => {
			console.log(cme);
			this.cme = cme;
			this.cmea = null;
			this.isLoading = false;
		});
		this.socket.emit('get cme', {
			startDate: moment(this.startModel).format('YYYY-MM-DD')
		});
	}

	private _createForm() {
		this.cmeaForm = new FormGroup({
			keyword: new FormControl(''),
			speed: new FormControl(0),
			halfAngle: new FormControl(0),
			catalogs: new FormControl('')
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
			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				keyword: this.myKeyword,
				halfAngle: this.myHalfAngle,
				speed: this.mySpeed,
				mostAccurateOnly: this.accurate,
				completeEntryOnly: this.complete,
				catalog: this.selectedCatalog
			});
			console.log({
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				keyword: this.keyword.value,
				halfAngle: this.halfAngle.value,
				speed: this.speed.value,
				mostAccurateOnly: this.accurate,
				completeEntryOnly: this.complete,
				catalog: this.catalogsControl.value
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
				this.socket.emit('get cmea', {
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					keyword: this.myKeyword,
					halfAngle: this.myHalfAngle,
					speed: this.mySpeed,
					mostAccurateOnly: this.accurate,
					completeEntryOnly: this.complete,
					catalog: this.selectedCatalog
				});
				console.log({
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD'),
					keyword: this.keyword.value,
					halfAngle: this.halfAngle.value,
					speed: this.speed.value,
					mostAccurateOnly: this.accurate,
					completeEntryOnly: this.complete,
					catalog: this.catalogsControl.value
				});
			} else {
				console.log('else');
				this.socket.emit('get cmea', {
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD'),
					keyword: this.myKeyword,
					halfAngle: this.myHalfAngle,
					speed: this.mySpeed,
					mostAccurateOnly: this.accurate,
					completeEntryOnly: this.complete,
					catalog: this.selectedCatalog
				});
				console.log({
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD'),
					keyword: this.keyword.value,
					halfAngle: this.halfAngle.value,
					speed: this.speed.value,
					mostAccurateOnly: this.accurate,
					completeEntryOnly: this.complete,
					catalog: this.catalogsControl.value
				});
			}
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

	get catalogsControl() {
		return this.cmeaForm.get('catalogs');
	}
}
