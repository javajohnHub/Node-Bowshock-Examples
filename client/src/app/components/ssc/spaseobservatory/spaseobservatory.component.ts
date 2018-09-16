import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-spaseobservatory',
	templateUrl: 'spaseobservatory.component.html',
	styles: []
})
export class SpaseobservatoryComponent {
	spaseobservatory: any = [];
	socket: any;
	constructor() {}

	ngOnInit() {
		this.socket = SocketService.getInstance();

		this.socket.on('send spaseobservatory', data => {
			this.spaseobservatory = data;
		});
		this.socket.emit('get spaseobservatory');
	}
}
