import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { SocketService } from '../../shared/socket.service';

@Component({
	selector: 'app-skymorph',
	templateUrl: './skymorph.component.html'
})
export class SkymorphComponent implements OnInit {
	socket: any;
	dataArr = [];
	starData: any = {};
	starImages = [];
	isLoading: boolean;
	model: string = 'J99TS7A';
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Skymorph');
		this.socket = SocketService.getInstance();
		this.socket.on('send star data', starData => {
			this.starData = starData;
			if (this.starData.results.length > 0) {
				for (let x = 0; x < this.starData.results.length; x++) {
					this.dataArr.push(this.starData.results[x].key);
				}
			}
			this.dataArr.forEach(key => {
				setTimeout(() => {
					this.socket.emit('get star image', {
						key: key
					});
				}, 2500);
			});
			this.isLoading = false;
		});

		this.socket.on('send star image', starImage => {
			this.starImages.push(starImage);
			this.isLoading = false;
		});
	}
	getData() {
		this.socket.emit('get star data', { target: this.model });
	}
}
