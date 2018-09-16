import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';
import { HttpClient } from '@angular/common/http';
@Component({
	selector: 'app-search',
	templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
	socket: any;
	isLoading: boolean;
	media;
	model = 'apollo';
	hrefs = [];
	srts = [];
	mp4s = [];
	mp4;
	pngs = [];
	jsons = [];
	constructor(
		private _sharedService: SharedService,
		private _http: HttpClient
	) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Image and Video Search');
		this.socket = SocketService.getInstance();
		this.socket.on('send media', media => {
			this.media = media.collection.items;
			this.media.forEach(med => {
				this.hrefs.push(med.href);
			});
			this.hrefs.forEach(href => {
				this._http
					.get(href)
					.pipe()
					.subscribe(data => {
						this.srts.push(data);
						if (this.srts[0]) {
							this.srts.forEach(srt => {
								srt.forEach(url => {
									if (
										url.slice(-3) == 'mp4' &&
										url.slice(-10) == 'medium.mp4'
									) {
										this.mp4s.push(url);
									}
									if (
										url.slice(-3) == 'png' ||
										url.slice(-3) == 'jpg'
									) {
										this.pngs.push(url);
									}
									if (url.slice(-4) == 'json') {
										this.jsons.push(url);
									}
								});

								// if (this.mp4s) {
								// 	this.mp4s.forEach(mp4 => {
								// 		this.mp4 = mp4.split('~');

								// 		if (this.mp4[1] == 'medium.m4a') {
								// 			this.mp4s.push(mp4);
								// 		}
								// 	});
								// }
							});
						}
					});
			});

			this.isLoading = false;
		});
	}
	getData() {
		this.isLoading = true;
		this.socket.emit('get media', { q: this.model });
	}
}
