import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-event',
	templateUrl: 'event.component.html'
})
export class EventComponent {
	@Input('event')
	event: any;
	@Input('socket')
	socket: any;
	imageUrl: any = [];
	isLoading: boolean = false;
	geos = [];
	tileDimension = 0.145;
	idx;
	id;
	constructor() {}

	ngOnInit() {
		this.isLoading = true;

		this.socket.on('send earth imagery', imageObj => {
			this.imageUrl.push(imageObj.url);
			this.isLoading = false;
		});
	}

	getImages(geo, x, id) {
		this.isLoading = true;
		this.idx = x;
		this.id = id;
		this.imageUrl = [];
		this.socket.emit('get earth imagery', {
			lon: geo.coordinates[0],
			lat: geo.coordinates[1],
			dim: this.tileDimension
		});
	}
}
