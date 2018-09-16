import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';
@Component({
	selector: 'app-cad',
	templateUrl: 'cad.component.html'
})
export class CadComponent {
	socket: any;
	cad = [];
	isLoading: boolean = false;
	cadForm: FormGroup;
	model;
	error = false;
	constructor(
		private _sharedService: SharedService,
		private _fb: FormBuilder
	) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('CAD');
		this.socket = SocketService.getInstance();
		this.socket.on('send cad', cad => {
			this.cad = cad;
			this.isLoading = false;
		});
		this.socket.on('send error', error => {
			this.error = true;
			this.isLoading = false;
		});
		this._createForm();

		// this.cadForm
		//     .get('query')
		//     .valueChanges.pipe(debounceTime(800))
		//     .subscribe(value => {
		//         this.isLoading = true;
		//         this.q = value;
		//         this.socket.emit('get patent', {
		//             query: value,
		//             limit: this.limit || 5
		//         });
		//     });
		this.socket.emit('get cad');
	}

	private _createForm() {
		this.cadForm = this._fb.group({});
	}
}
