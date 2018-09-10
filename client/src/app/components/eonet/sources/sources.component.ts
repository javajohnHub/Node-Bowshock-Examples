import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-sources',
	templateUrl: 'sources.component.html'
})
export class SourcesComponent {
	socket: any;
	sources: any = {};
	isLoading: boolean = false;

	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next(
			'The Earth Observatory Natural Event Tracker/Sources'
		);
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('send sources', sources => {
			this.sources = sources;
			this.isLoading = false;
		});

		this.socket.emit('get sources');
	}
}
