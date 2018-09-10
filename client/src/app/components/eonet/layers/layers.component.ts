import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-layers',
	templateUrl: 'layers.component.html'
})
export class LayersComponent {
	socket: any;
	layers = [];
	isLoading: boolean = false;

	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next(
			'The Earth Observatory Natural Event Tracker/layers'
		);
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('send layers', layers => {
			this.layers = layers;
			this.isLoading = false;
		});

		this.socket.emit('get layers', 8);
	}
}
