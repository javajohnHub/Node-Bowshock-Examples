import { Component } from '@angular/core';
import { SocketService } from '../../shared/socket.service';
import { SharedService } from '../../shared/shared.service';

@Component({
	selector: 'app-eva',
	templateUrl: 'eva.component.html'
})
export class EvaComponent {
	socket: any;
	eva = [];
	isLoading: boolean = false;
	copy;
	model;
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Extra Vehicular Activity');
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('recieve eva', data => {
			this.eva = data;
			this.model = 0;
			this.copy = JSON.parse(JSON.stringify(this.eva));

			this.isLoading = false;
		});
		this.socket.emit('get eva');
	}
	getEVA() {
		this.eva = JSON.parse(JSON.stringify(this.copy));

		let found = this.eva.find(obj => obj.eva == this.model);
		if (found) {
			this.eva = [found];
		}
	}
	loadData(event: any) {}
	keys(data): Array<string> {
		return Object.keys(data);
	}
}
