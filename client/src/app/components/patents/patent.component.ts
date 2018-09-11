import { Component } from '@angular/core';
import { SocketService } from '../../shared/socket.service';
import { SharedService } from '../../shared/shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
	selector: 'app-patent',
	templateUrl: 'patent.component.html'
})
export class PatentComponent {
	socket: any;
	patent = [];
	isLoading: boolean = false;
	patentForm: FormGroup;
	concept_tags;
	q;
	limit;
	copy;
	model;
	constructor(
		private _sharedService: SharedService,
		private _fb: FormBuilder
	) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Patent');
		this.socket = SocketService.getInstance();
		this.socket.on('send patent', patent => {
			this.patent = patent;
			this.model = 0;
			this.copy = JSON.parse(JSON.stringify(this.patent));

			this.isLoading = false;
		});

		this._createForm();
		this.patentForm
			.get('query')
			.valueChanges.pipe(debounceTime(800))
			.subscribe(value => {
				this.isLoading = true;
				this.q = value;
				this.socket.emit('get patent', {
					query: value,
					concept_tags: this.concept_tags || '',
					limit: this.limit || 0
				});
			});

		this.patentForm
			.get('conceptTags')
			.valueChanges.pipe(debounceTime(800))
			.subscribe(value => {
				this.isLoading = true;
				this.concept_tags = value;
				this.socket.emit('get patent', {
					query: this.q,
					concept_tags: value,
					limit: this.limit || 0
				});
			});

		this.patentForm
			.get('limit')
			.valueChanges.pipe(debounceTime(800))
			.subscribe(value => {
				this.isLoading = true;
				this.limit = value;
				this.socket.emit('get patent', {
					query: this.q || '',
					concept_tags: this.concept_tags || '',
					limit: value
				});
			});
	}

	private _createForm() {
		this.patentForm = this._fb.group({
			query: [''],
			conceptTags: [''],
			limit: [5]
		});
	}
}
