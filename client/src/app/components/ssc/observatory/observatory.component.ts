import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-observatory',
	templateUrl: 'observatory.component.html',
	styles: []
})
export class ObservatoryComponent {
	observatory: any = [];
	socket: any;
	constructor() {}

	ngOnInit() {
		this.socket = SocketService.getInstance();

		this.socket.on('send observatory', data => {
			this.observatory = data;
		});
		this.socket.emit('get observatory');
	}
}
