import { Component } from '@angular/core';
import { SocketService } from '../../shared/socket.service';
import { SharedService } from '../../shared/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
	selector: 'app-geneLab',
	templateUrl: 'geneLab.component.html'
})
export class GeneLabComponent {
	socket: any;
	gene: any;
	isLoading: boolean = false;
	copy;
	model;
	geneLabForm: FormGroup;
	constructor(
		private _sharedService: SharedService,
		private _fb: FormBuilder
	) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('GeneLab');
		this.socket = SocketService.getInstance();
		this.socket.on('send geneLab', gene => {
			this.gene = gene;
			this.model = 0;
			this.copy = JSON.parse(JSON.stringify(this.gene));

			this.isLoading = false;
		});

		this._createForm();
		this.geneLabForm
			.get('keyword')
			.valueChanges.pipe(debounceTime(800))
			.subscribe(value => {
				this.isLoading = true;
				this.socket.emit('get geneLab', {
					term: value,
					type: 'cgene'
				});
			});
	}

	private _createForm() {
		this.geneLabForm = this._fb.group({
			keyword: ['']
		});
	}
}
