import { Component } from '@angular/core';
import { SocketService } from '../../../shared/socket.service';
import { SharedService } from '../../../shared/shared.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-insight',
	template: `
  <div class="ui-g">
    <div class="ui-g-12">
    <div *ngIf="pictures" class="ui-g-12">
    <p-spinner placeholder="per page" [formControl]="perPage" [min]="0" [max]="pictures.total" ></p-spinner>
    <p-spinner placeholder="page" [formControl]="page" [min]="0" [max]="max"></p-spinner>

  Total: {{pictures.total}}
      <ng-container *ngFor="let picture of pictures.items">
      <p-card>
                <p-header class="square">
                    <img class="center" src="{{picture.url}}">
                </p-header>
                <div class="border" style="padding:6px;color: white;" [innerHTML]="picture.description"></div>
            </p-card>
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
