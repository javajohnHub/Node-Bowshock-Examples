import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-sentry',
	templateUrl: 'sentry.component.html'
})
export class SentryComponent {
	socket: any;
	sentry = [];
	isLoading: boolean = false;
	sentryForm: FormGroup;
	model;
	error = false;
	constructor(
		private _sharedService: SharedService,
		private _fb: FormBuilder
	) {}

	ngAfterViewChecked() {}
	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Sentry');
		this.socket = SocketService.getInstance();
		this.socket.on('send sentry', sentry => {
			this.sentry = sentry;

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
		this.socket.emit('get sentry');
	}

	private _createForm() {
		this.sentryForm = this._fb.group({});
	}
}
