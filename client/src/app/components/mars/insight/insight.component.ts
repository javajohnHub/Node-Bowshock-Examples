import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
	selector: 'app-cinsight',
	template: `
  <div class="ui-g">
    <div class="ui-g-12">
    <div *ngIf="pictures" class="ui-g-12">
    <p-spinner placeholder="per page" [(ngModel)]="perPage" [max]="pictures.total" (onChange)="perPageChanged()"></p-spinner>
    <p-spinner placeholder="page" [(ngModel)]="page" (onChange)="pageChanged()"></p-spinner>

  Total: {{pictures.total}}
      <ng-container *ngFor="let picture of pictures.items">
      <img class="center ui-sm-12 ui-md-12 ui-lg-10 ui-lg-offset-1 ui-xl-8 ui-xl-offset-2" src="{{picture.url}}">
      <div class="ui-g" [innerHTML]="picture.description"></div>
      </ng-container>
      <div *ngIf="pictures.items.length == 0">
        <h1>No Photos Found</h1>
      </div>
    </div>
  </div>
  </div>

  `
})
export class InsightComponent {
	socket: any;
  pictures: {};
  perPage = 50;
  page = 0;
	constructor(private _sharedService: SharedService) {}
	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Mars/Insight');
		this.socket = SocketService.getInstance();

		this.socket.on('send insight', data => {
      this.pictures = data;
      console.log(data)
    });

		this.socket.emit('get insight', {perPage: this.perPage, page: this.page});
  }

  perPageChanged(){
    this.socket.emit('get insight', {perPage: this.perPage, page: this.page});
  }

  pageChanged(){
    this.socket.emit('get insight', {perPage: this.perPage, page: this.page});
  }
}
