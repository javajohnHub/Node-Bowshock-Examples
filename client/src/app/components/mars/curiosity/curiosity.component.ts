import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
	selector: 'app-curiosity',
	template: `
  <div class="ui-g">

    <div class="ui-g-12">
      <p-calendar [inputStyle]="{'width':'100%', 'margin': 'auto'}" [showIcon]="true" [selectOtherMonths]="true" [readonlyInput]="true" (onSelect)="onDateChanged($event)" [(ngModel)]="model" dateFormat="yy-mm-dd" [maxDate]="maxDate"></p-calendar>
  <div *ngIf="pictures" class="ui-g-12">
      <ng-container *ngFor="let picture of pictures.photos">
      <p-card>
                <p-header class="square">
                    <img class="center" src="{{picture.img_src}}">
                </p-header>
                <div class="border" style="padding:6px;color: white;">Sol: {{picture.sol}} - {{picture.camera.name}}</div>
            </p-card>
      </ng-container>
      <div *ngIf="pictures.photos.length == 0">
        <h1>No Photos Found</h1>
      </div>
    </div>

  </div>
  </div>

  `
})
export class CuriosityComponent {
	socket: any;
	pictures: {};
	model: Date;
	maxDate: Date;
	constructor(private _sharedService: SharedService) {}
	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Mars/Curiosity');
		this.model = new Date();
		this.maxDate = new Date();
		this.socket = SocketService.getInstance();

		this.socket.on('send curiosity', data => {
			this.pictures = data;
		});
		let myDate = this.model.toISOString().split('T')[0];
		let last = parseInt(myDate.split('-')[2]);
		let str =
			myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;

		this.socket.emit('get curiosity', str);
	}

	onDateChanged(event): void {
		this.model = new Date(event);
		let myDate = this.model.toISOString().split('T')[0];
		this.socket.emit('get curiosity', myDate);
	}
}
