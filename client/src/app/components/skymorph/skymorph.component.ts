import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { SocketService } from '../../shared/socket.service';

@Component({
	selector: 'app-skymorph',
	templateUrl: './skymorph.component.html'
})
export class SkymorphComponent implements OnInit {
	socket: any;
	starData: any = {};
	starImage: string;
	isLoading: boolean;
	model: string;
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Skymorph');
		this.socket = SocketService.getInstance();
		this.socket.on('send star data', starData => {
			console.log(starData);
			this.starData = starData;
			if (this.starData.results.length > 0) {
				this.starData.results.forEach(result => {
					this.socket.emit('get star image', {
						key: result.key
					});
				});
			}

			this.isLoading = false;
		});

		this.socket.on('send star image', starImage => {
			console.log(starImage);
			this.starImage = starImage;
			this.isLoading = false;
		});
	}
	getData() {
		this.socket.emit('get star data', { target: this.model });
	}
}
