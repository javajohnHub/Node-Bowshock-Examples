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
	constructor() {}

	ngOnInit() {
		this.isLoading = true;

		this.socket.on('send earth imagery', imageUrl => {
			this.imageUrl = imageUrl;
			this.isLoading = false;
		});
	}

	getImages(geo) {
		this.isLoading = true;
		this.socket.emit(
			'get earth imagery',
			{
				lon: geo.coordinates[0],
				lat: geo.coordinates[1],
				dim: this.tileDimension
			},
			data => console.log(data)
		);
	}
}
