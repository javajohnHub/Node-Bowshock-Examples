import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-categories',
	templateUrl: 'categories.component.html'
})
export class CategoriesComponent {
	socket: any;
	categories = [];
	isLoading: boolean = false;

	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next(
			'The Earth Observatory Natural Event Tracker/Categories'
		);
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('send categories', categories => {
			this.categories = categories;
			this.isLoading = false;
		});

		this.socket.emit('get categories');
	}
}
