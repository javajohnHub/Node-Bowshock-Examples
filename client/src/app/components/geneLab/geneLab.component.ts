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
	geneLabForm: FormGroup;
	selectedType;
	selectedSize;
	types = [];
	sizes = [];
	constructor(
		private _sharedService: SharedService,
		private _fb: FormBuilder
	) {}

	ngOnInit() {
		this.types = [
			{ label: 'Choose DB', value: 'cgene' },
			{ label: 'cgene', value: 'cgene' },
			{ label: 'nih_geo_gse', value: 'nih_geo_gse' },
			{ label: 'ebi_pride', value: 'ebi_pride' },
			{ label: 'mg_ras;', value: 'mg_ras' }
		];
		this.sizes.push({
			label: 'Amount Per Page',
			value: 25
		});
		this._sharedService.subTitleSubject$.next('GeneLab');
		this.socket = SocketService.getInstance();
		this.socket.on('send geneLab', gene => {
      this.gene = gene;
			this.copy = JSON.parse(JSON.stringify(this.gene));
			this.isLoading = true;
			for (let x = 0; x < gene.hits.total / 25 + 25; x++) {
				this.sizes.push({
					label: 25 * x,
					value: 25 * x
				});
			}
			this.isLoading = false;
		});

		this._createForm();
		this.geneLabForm
			.get('keyword')
			.valueChanges.pipe(debounceTime(800))
			.subscribe(value => {
				this.isLoading = true;
				this.socket.emit('get geneLab', {
					term: value || '',
					type: this.selectedType || 'cgene'
				});
			});

		this.geneLabForm.get('typesControl').valueChanges.subscribe(value => {
			this.selectedType = value;
			this.isLoading = true;
			this.socket.emit('get geneLab', {
				term: this.geneLabForm.get('keyword').value || '',
				type: this.selectedType,
				size: this.geneLabForm.get('sizesControl').value || 'cgene'
			});
		});

		this.geneLabForm.get('sizesControl').valueChanges.subscribe(value => {
			this.selectedSize = value;
			this.isLoading = true;
			this.socket.emit('get geneLab', {
				term: this.geneLabForm.get('keyword').value || '',
				type: this.selectedType || 'cgene',
				size: this.selectedSize
			});
		});
		this.isLoading = false;
	}

	private _createForm() {
		this.geneLabForm = this._fb.group({
			keyword: [''],
			typesControl: [''],
			sizesControl: [25]
		});
	}
}
