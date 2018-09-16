import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-spaseobservatory',
	templateUrl: 'spaseobservatory.component.html',
	styles: []
})
export class SpaseobservatoryComponent {
	spaseobservatory: any = [];
	socket: any;
	safe_url;
	constructor(private sanitizer: DomSanitizer) {}

	ngOnInit() {
		this.socket = SocketService.getInstance();
		this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(
			'http://spase.info/registry/render?id=spase://SMWG/Observatory/DMSP'
		);
		this.socket.on('send spaseobservatory', data => {
			this.spaseobservatory = data;
		});
		this.socket.emit('get spaseobservatory');
	}
}
