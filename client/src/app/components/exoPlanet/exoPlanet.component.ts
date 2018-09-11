import { Component } from '@angular/core';
import { SocketService } from '../../shared/socket.service';
import { SharedService } from '../../shared/shared.service';

@Component({
	selector: 'app-exoPlanet',
	templateUrl: 'exoPlanet.component.html'
})
export class ExoPlanetComponent {
	socket: any;
	exoPlanetData = [];
	isLoading: boolean = false;
	copy;

	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('ExoPlanet');
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('send allConfirmedPlanetsAndCols', data => {
			this.exoPlanetData = data;
			this.copy = JSON.parse(JSON.stringify(this.exoPlanetData));

			this.isLoading = false;
		});
	}

	getAllConfirmedPlanetsAndCols() {
		this.socket.emit('get allConfirmedPlanetsAndCols');
	}

	getAllPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K() {
		this.socket.emit(
			'get allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K'
		);
	}
}
