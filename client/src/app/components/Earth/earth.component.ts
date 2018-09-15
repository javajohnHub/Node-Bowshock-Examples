import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { SocketService } from '../../shared/socket.service';
import { FormBuilder, AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-earth',
	templateUrl: 'earth.component.html'
})
export class EarthComponent {
	socket: any;
	image: string;
	isLoading: boolean = false;
	tileDimension = 0.145; //0.145;
	earthForm;
	model = new Date();
	maxDate = new Date();
	constructor(
		private _sharedService: SharedService,
		private _fb: FormBuilder
	) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Earth');
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('send earth imagery', image => {
			this.image = image.url;
			this.isLoading = false;
		});
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				console.log(position);
				this.lat.setValue(position.coords.latitude);
				this.lon.setValue(position.coords.longitude);
				this.dim.setValue(this.tileDimension);
				this.socket.emit('get earth imagery', {
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					dim: this.tileDimension
				});
			});
		}

		this._createForm();
	}

	_createForm() {
		this.earthForm = this._fb.group({
			lat: [],
			lon: [],
			dim: []
		});
	}

	onDateChanged(event) {
		console.log(event);
	}
	getImages() {
		this.socket.emit('get earth imagery', {
			lon: this.lat.value,
			lat: this.lon.value,
			dim: this.dim.value || this.tileDimension,
			date: this.model
		});
	}

	get lat(): AbstractControl {
		return this.earthForm.get('lat');
	}
	get lon(): AbstractControl {
		return this.earthForm.get('lon');
	}
	get dim(): AbstractControl {
		return this.earthForm.get('dim');
	}
}
