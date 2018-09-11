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
	myInput;
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

		this.socket.on(
			'send allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K',
			data => {
				this.exoPlanetData = data;
				this.copy = JSON.parse(JSON.stringify(this.exoPlanetData));

				this.isLoading = false;
			}
		);

		this.socket.on('send getSingleKOI', data => {
			this.exoPlanetData = data;
			this.copy = JSON.parse(JSON.stringify(this.exoPlanetData));

			this.isLoading = false;
		});

		this.socket.on('send getConfirmedPlanetsInKeplerField', data => {
			this.exoPlanetData = data;
			this.copy = JSON.parse(JSON.stringify(this.exoPlanetData));

			this.isLoading = false;
		});

		this.socket.on('send getStarsKnownToHostExoPlanets', data => {
			this.exoPlanetData = data;
			this.copy = JSON.parse(JSON.stringify(this.exoPlanetData));

			this.isLoading = false;
		});

		this.socket.on('send confirmedPlanetsThatTransitHostStars', data => {
			this.exoPlanetData = data;
			this.copy = JSON.parse(JSON.stringify(this.exoPlanetData));

			this.isLoading = false;
		});

		this.socket.on('send currentNonConfirmedPlanetCandidates', data => {
			this.exoPlanetData = data;
			this.copy = JSON.parse(JSON.stringify(this.exoPlanetData));

			this.isLoading = false;
		});

		this.socket.on('send k2TargetsFromCampaign9', data => {
			this.exoPlanetData = data;
			this.copy = JSON.parse(JSON.stringify(this.exoPlanetData));

			this.isLoading = false;
		});

		this.socket.on('send confirmedPlanetsInMissionStarList', data => {
			this.exoPlanetData = data;
			this.copy = JSON.parse(JSON.stringify(this.exoPlanetData));

			this.isLoading = false;
		});

		this.socket.on('send allMicrolensingPlanetsWithTimeSeries', data => {
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

	getSingleKOI(koi) {
		this.socket.emit('get getSingleKOI', koi);
	}

	getConfirmedPlanetsInKeplerField() {
		this.socket.emit('get confirmedPlanetsInKeplerField');
	}
	getStarsKnownToHostExoPlanets() {
		this.socket.emit('get starsKnownToHostExoPlanets');
	}
	getConfirmedPlanetsThatTransitHostStars() {
		this.socket.emit('get confirmedPlanetsThatTransitHostStars');
	}

	getCurrentNonConfirmedPlanetCandidates() {
		this.socket.emit('get currentNonConfirmedPlanetCandidates');
	}

	k2TargetsFromCampaign9() {
		this.socket.emit('get k2TargetsFromCampaign9');
	}

	getConfirmedPlanetsInMissionStarList() {
		this.socket.emit('get confirmedPlanetsInMissionStarList');
	}

	getAllMicrolensingPlanetsWithTimeSeries() {
		this.socket.emit('get allMicrolensingPlanetsWithTimeSeries');
	}
}
