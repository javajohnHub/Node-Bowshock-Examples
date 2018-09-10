import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { SocketService } from '../../../shared/socket.service';

@Component({
	selector: 'app-layers',
	templateUrl: 'layers.component.html'
})
export class LayersComponent {
	socket: any;
	layers: any = {};
	isLoading: boolean = false;
	catagories;
	selectedCatagory;
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next(
			'The Earth Observatory Natural Event Tracker/layers'
		);
		this.isLoading = true;

		this.catagories = [
			{ label: 'Select Catalog', value: null },
			{ label: 'Drought', value: 6 },
			{ label: 'Dust and Haze', value: 7 },
			{ label: 'Earthquakes', value: 16 },
			{ label: 'Floods', value: 9 },
			{ label: 'Landslides', value: 14 },
			{ label: 'Manmade', value: 19 },
			{ label: 'Sea and Lake Ice', value: 15 },
			{ label: 'Severe Storms', value: 10 },
			{ label: 'Snow', value: 17 },
			{ label: 'Temperature Extremes', value: 18 },
			{ label: 'Volcanoes', value: 12 },
			{ label: 'Water Color', value: 13 },
			{ label: 'Wildfires', value: 8 }
		];

		this.socket = SocketService.getInstance();
		this.socket.on('send layers', layers => {
			this.layers = layers;
			this.isLoading = false;
		});

		this.socket.emit('get layers', 6);
	}

	getCategory() {
		this.socket.emit('get layers', this.selectedCatagory);
	}
	getUrl(base_url, name, matrixSet) {}
}
