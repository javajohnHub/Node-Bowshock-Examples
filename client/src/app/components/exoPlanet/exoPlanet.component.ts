import { Component } from '@angular/core';
import { SocketService } from '../../shared/socket.service';
import { SharedService } from '../../shared/shared.service';

@Component({
	selector: 'app-exoPlanet',
	templateUrl: 'exoPlanet.component.html'
})
export class ExoPlanetComponent {
	socket: any;
	allConfirmedPlanetsAndCols = [];
	allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
	getSingleKOI = [];
	confirmedPlanetsInKeplerField = [];
	starsKnownToHostExoPlanets = [];
	confirmedPlanetsThatTransitHostStars = [];
	allMicrolensingPlanetsWithTimeSeries = [];
	confirmedPlanetsInMissionStarList = [];
	k2TargetsFromCampaign9 = [];
	currentNonConfirmedPlanetCandidates = [];
	isLoading: boolean = false;
	copy;
	myInput;
	collapse: boolean;
	constructor(private _sharedService: SharedService) {}

	ngOnInit() {
		this._sharedService.subTitleSubject$.next('ExoPlanet');
		this.isLoading = true;
		this.socket = SocketService.getInstance();
		this.socket.on('send allConfirmedPlanetsAndCols', data => {
			console.log(data);
			this.allMicrolensingPlanetsWithTimeSeries = [];
			this.confirmedPlanetsInMissionStarList = [];
			this.k2TargetsFromCampaign9 = [];
			this.currentNonConfirmedPlanetCandidates = [];
			this.confirmedPlanetsThatTransitHostStars = [];
			this.starsKnownToHostExoPlanets = [];
			this.confirmedPlanetsInKeplerField = [];
			this.getSingleKOI = [];
			this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
			this.allConfirmedPlanetsAndCols = data;
			this.isLoading = false;
		});

		this.socket.on(
			'send allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K',
			data => {
				this.allMicrolensingPlanetsWithTimeSeries = [];
				this.confirmedPlanetsInMissionStarList = [];
				this.k2TargetsFromCampaign9 = [];
				this.currentNonConfirmedPlanetCandidates = [];
				this.confirmedPlanetsThatTransitHostStars = [];
				this.starsKnownToHostExoPlanets = [];
				this.confirmedPlanetsInKeplerField = [];
				this.getSingleKOI = [];
				this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = data;
				this.allConfirmedPlanetsAndCols = [];
				this.isLoading = false;
			}
		);

		this.socket.on('send getSingleKOI', data => {
			console.log(data);
			this.allMicrolensingPlanetsWithTimeSeries = [];
			this.confirmedPlanetsInMissionStarList = [];
			this.k2TargetsFromCampaign9 = [];
			this.currentNonConfirmedPlanetCandidates = [];
			this.confirmedPlanetsThatTransitHostStars = [];
			this.starsKnownToHostExoPlanets = [];
			this.confirmedPlanetsInKeplerField = [];
			this.getSingleKOI = data;
			this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
			this.allConfirmedPlanetsAndCols = [];
			this.isLoading = false;
		});

		this.socket.on('send confirmedPlanetsInKeplerField', data => {
			this.allMicrolensingPlanetsWithTimeSeries = [];
			this.confirmedPlanetsInMissionStarList = [];
			this.k2TargetsFromCampaign9 = [];
			this.currentNonConfirmedPlanetCandidates = [];
			this.confirmedPlanetsThatTransitHostStars = [];
			this.starsKnownToHostExoPlanets = [];
			this.confirmedPlanetsInKeplerField = data;
			this.getSingleKOI = [];
			this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
			this.allConfirmedPlanetsAndCols = [];
			this.isLoading = false;
		});

		this.socket.on('send starsKnownToHostExoPlanets', data => {
			this.allMicrolensingPlanetsWithTimeSeries = [];
			this.confirmedPlanetsInMissionStarList = [];
			this.k2TargetsFromCampaign9 = [];
			this.currentNonConfirmedPlanetCandidates = [];
			this.confirmedPlanetsThatTransitHostStars = [];
			this.starsKnownToHostExoPlanets = data;
			this.confirmedPlanetsInKeplerField = [];
			this.getSingleKOI = [];
			this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
			this.allConfirmedPlanetsAndCols = [];
			this.isLoading = false;
		});

		this.socket.on('send confirmedPlanetsThatTransitHostStars', data => {
			this.allMicrolensingPlanetsWithTimeSeries = [];
			this.confirmedPlanetsInMissionStarList = [];
			this.k2TargetsFromCampaign9 = [];
			this.currentNonConfirmedPlanetCandidates = [];
			this.confirmedPlanetsThatTransitHostStars = data;
			this.starsKnownToHostExoPlanets = [];
			this.confirmedPlanetsInKeplerField = [];
			this.getSingleKOI = [];
			this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
			this.allConfirmedPlanetsAndCols = [];
			this.isLoading = false;
		});

		this.socket.on('send currentNonConfirmedPlanetCandidates', data => {
			this.allMicrolensingPlanetsWithTimeSeries = [];
			this.confirmedPlanetsInMissionStarList = [];
			this.k2TargetsFromCampaign9 = [];
			this.currentNonConfirmedPlanetCandidates = data;
			this.confirmedPlanetsThatTransitHostStars = [];
			this.starsKnownToHostExoPlanets = [];
			this.confirmedPlanetsInKeplerField = [];
			this.getSingleKOI = [];
			this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
			this.allConfirmedPlanetsAndCols = [];
			this.isLoading = false;
		});

		this.socket.on('send k2TargetsFromCampaign9', data => {
			this.allMicrolensingPlanetsWithTimeSeries = [];
			this.confirmedPlanetsInMissionStarList = [];
			this.k2TargetsFromCampaign9 = data;
			this.currentNonConfirmedPlanetCandidates = [];
			this.confirmedPlanetsThatTransitHostStars = [];
			this.starsKnownToHostExoPlanets = [];
			this.confirmedPlanetsInKeplerField = [];
			this.getSingleKOI = [];
			this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
			this.allConfirmedPlanetsAndCols = [];
			this.isLoading = false;
		});

		this.socket.on('send confirmedPlanetsInMissionStarList', data => {
			this.allMicrolensingPlanetsWithTimeSeries = [];
			this.confirmedPlanetsInMissionStarList = data;
			this.k2TargetsFromCampaign9 = [];
			this.currentNonConfirmedPlanetCandidates = [];
			this.confirmedPlanetsThatTransitHostStars = [];
			this.starsKnownToHostExoPlanets = [];
			this.confirmedPlanetsInKeplerField = [];
			this.getSingleKOI = [];
			this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
			this.allConfirmedPlanetsAndCols = [];
			this.isLoading = false;
		});

		this.socket.on('send allMicrolensingPlanetsWithTimeSeries', data => {
			this.allMicrolensingPlanetsWithTimeSeries = data;
			this.confirmedPlanetsInMissionStarList = [];
			this.k2TargetsFromCampaign9 = [];
			this.currentNonConfirmedPlanetCandidates = [];
			this.confirmedPlanetsThatTransitHostStars = [];
			this.starsKnownToHostExoPlanets = [];
			this.confirmedPlanetsInKeplerField = [];
			this.getSingleKOI = [];
			this.allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K = [];
			this.allConfirmedPlanetsAndCols = [];
			this.isLoading = false;
		});
		this.isLoading = false;
	}

	getAllConfirmedPlanetsAndCols() {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit('get allConfirmedPlanetsAndCols');
	}

	getAllPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K() {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit(
			'get allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K'
		);
	}

	getgetSingleKOI(koi) {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit('get getSingleKOI', koi);
	}

	getConfirmedPlanetsInKeplerField() {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit('get confirmedPlanetsInKeplerField');
	}
	getStarsKnownToHostExoPlanets() {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit('get starsKnownToHostExoPlanets');
	}
	getConfirmedPlanetsThatTransitHostStars() {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit('get confirmedPlanetsThatTransitHostStars');
	}

	getCurrentNonConfirmedPlanetCandidates() {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit('get currentNonConfirmedPlanetCandidates');
	}

	getk2TargetsFromCampaign9() {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit('get k2TargetsFromCampaign9');
	}

	getConfirmedPlanetsInMissionStarList() {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit('get confirmedPlanetsInMissionStarList');
	}

	getAllMicrolensingPlanetsWithTimeSeries() {
		this.isLoading = true;
		this.collapse = true;
		this.socket.emit('get allMicrolensingPlanetsWithTimeSeries');
	}
}
