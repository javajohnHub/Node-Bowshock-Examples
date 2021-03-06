import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
@Component({
	selector: 'app-cmea',
	templateUrl: 'cmea.component.html'
})
export class CMEAComponent {
	socket: any;
	cmea: any;
	completeBool: boolean = true;
	accurateBool: boolean = true;
	speed;
	halfAngle;
	cmeaForm: FormGroup;
	catalogs;
	selectedCatalog: string = 'ALL';
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
		this.catalogs = [
			{ label: 'Select Catalog', value: 'ALL' },
			{ label: 'ALL', value: 'ALL' },
			{ label: 'SWRC_CATALOG', value: 'SWRC_CATALOG' },
			{ label: 'JANG_ET_AL_CATALOG', value: 'JANG_ET_AL_CATALOG' }
		];

		this.socket = SocketService.getInstance();
		this.socket.on('send cmea', cmea => {
			this.cmea = cmea;
			this.isLoading = false;
		});

		if (
			this.route.snapshot.params['startDate'] ||
			this.route.snapshot.params['id']
		) {
			this.longDate = this.route.snapshot.params['id'];
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

		this.cmeaForm.get('catalogsControl').valueChanges.subscribe(value => {
			this.selectedCatalog = value;
			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				endDate: moment(this.endModel).format('YYYY-MM-DD'),
				catalog: this.selectedCatalog,
				mostAccurateOnly: this.accurateBool,
				completeEntryOnly: this.completeBool,
				keyword: this.cmeaForm.get('keyword').value,
				speed: this.cmeaForm.get('speed').value,
				halfAngle: this.cmeaForm.get('halfAngle').value
			});
		});

		this.cmeaForm
			.get('accurate')
			.valueChanges.pipe(debounceTime(500))
			.subscribe(value => {
				this.accurateBool = value;
				this.socket.emit('get cmea', {
					startDate: moment(this.startModel).format('YYYY-MM-DD'),
					endDate: moment(this.endModel).format('YYYY-MM-DD'),
					catalog: this.selectedCatalog,
					mostAccurateOnly: this.accurateBool,
					completeEntryOnly: this.completeBool,
					keyword: this.cmeaForm.get('keyword').value,
					speed: this.cmeaForm.get('speed').value,
					halfAngle: this.cmeaForm.get('halfAngle').value
				});
			});

		this.cmeaForm.get('complete').valueChanges.subscribe(value => {
			this.completeBool = value;
			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				endDate: moment(this.endModel).format('YYYY-MM-DD'),
				catalog: this.selectedCatalog,
				mostAccurateOnly: this.accurateBool,
				completeEntryOnly: this.completeBool,
				keyword: this.cmeaForm.get('keyword').value,
				speed: this.cmeaForm.get('speed').value,
				halfAngle: this.cmeaForm.get('halfAngle').value
			});
		});

		this.cmeaForm.get('keyword').valueChanges.subscribe(value => {
			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				endDate: moment(this.endModel).format('YYYY-MM-DD'),
				catalog: this.selectedCatalog,
				mostAccurateOnly: this.accurateBool,
				completeEntryOnly: this.completeBool,
				keyword: value,
				speed: this.cmeaForm.get('speed').value,
				halfAngle: this.cmeaForm.get('halfAngle').value
			});
		});

		this.cmeaForm.get('speed').valueChanges.subscribe(value => {
			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				endDate: moment(this.endModel).format('YYYY-MM-DD'),
				catalog: this.selectedCatalog,
				mostAccurateOnly: this.accurateBool,
				completeEntryOnly: this.completeBool,
				keyword: this.cmeaForm.get('keyword').value,
				speed: value,
				halfAngle: this.cmeaForm.get('halfAngle').value
			});
		});

		this.cmeaForm.get('halfAngle').valueChanges.subscribe(value => {
			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD'),
				endDate: moment(this.endModel).format('YYYY-MM-DD'),
				catalog: this.selectedCatalog,
				mostAccurateOnly: this.accurateBool,
				completeEntryOnly: this.completeBool,
				keyword: this.cmeaForm.get('keyword').value,
				speed: this.cmeaForm.get('speed').value,
				halfAngle: value
			});
		});
	}

	private _createForm() {
		this.cmeaForm = this._fb.group({
			startDate: [this.maxStartDate],
			endDate: [this.endModel],
			accurate: [true],
			complete: [true],
			speed: [0],
			halfAngle: [0],
			catalogsControl: ['ALL'],
			keyword: ['NONE']
		});
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

			this.socket.emit('get cmea', {
				startDate: moment(this.startModel).format('YYYY-MM-DD')
			});

		} else {
			if (
				moment(this.startModel).format('YYYY-MM-DD') >
				moment(this.endModel).format('YYYY-MM-DD')
			) {
				this.endModel = new Date();

				this.socket.emit('get cmea', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});

			} else {

				this.socket.emit('get cmea', {
					startDate: moment(this.startModel).format('YYYY-MM-DD')
				});

			}
		}
	}
}
