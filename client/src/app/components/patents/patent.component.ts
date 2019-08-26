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
	patents = [];
	isLoading: boolean = false;
	patentForm: FormGroup;
	q;
	limit;
	copy;
	model;
	error = false;
	constructor(
		private _sharedService: SharedService,
		private _fb: FormBuilder
	) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Patent');
    this.socket = SocketService.getInstance();
    this.isLoading = true;
		this.socket.on('send patents', patents => {
			this.patents = patents;
			this.copy = JSON.parse(JSON.stringify(this.patents));

			this.isLoading = false;
		});

    this.socket.emit('get patents')
	}
}
