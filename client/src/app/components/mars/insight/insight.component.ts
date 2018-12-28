import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-cinsight',
	template: `
  <div class="ui-g">
    <div class="ui-g-12">
    <div *ngIf="pictures" class="ui-g-12">
    <p-spinner placeholder="per page" formControlName="perPage" [min]="0" [max]="pictures.total" ></p-spinner>
    <p-spinner placeholder="page" formControlName="page" [min]="0" [max]="max"></p-spinner>

  Total: {{pictures.total}}
      <ng-container *ngFor="let picture of pictures.items">
      <img class="center ui-sm-12 ui-md-12 ui-lg-10 ui-lg-offset-1 ui-xl-8 ui-xl-offset-2" src="{{picture.url}}">
      <div class="ui-g-12" [innerHTML]="picture.description"></div>
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
  pictures: any;
  perPage: FormControl = new FormControl();
  page: FormControl = new FormControl();
  perPage$: Subscription;
  page$: Subscription;
	constructor(private _sharedService: SharedService) {}
	ngOnInit() {
		this._sharedService.subTitleSubject$.next('Mars/Insight');
		this.socket = SocketService.getInstance();

		this.socket.on('send insight', data => {
      this.pictures = data;
    });

    this.perPage$ = this.perPage.valueChanges.pipe(debounceTime(700)).subscribe((data) => {
      this.socket.emit('get insight', {perPage: this.perPage.value, page: this.page.value});
    })

    this.page$ = this.page.valueChanges.pipe(debounceTime(700)).subscribe((data) => {
      this.socket.emit('get insight', {perPage: this.perPage.value, page: this.page.value});
    })

		this.socket.emit('get insight', {perPage: this.perPage.value, page: this.page.value});
  }

  ngOnDestroy(){
    this.perPage$.unsubscribe();
    this.page$.unsubscribe();
  }
  get max(){
    return Math.floor(this.pictures.total / this.perPage.value).toFixed(0)
  }
}
