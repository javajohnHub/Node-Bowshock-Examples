import { Component } from "@angular/core";
import { SocketService } from "../../shared/socket.service";

@Component({
  selector: "app-eva",
  template: `
<div class="ui-g center-item" *ngIf="isLoading">
  <div class="ui-g-12">
    <p-progressSpinner></p-progressSpinner>
  </div>
</div>

<div class="ui-g" *ngIf="eva && !isLoading">
<div class="ui-g-12">
  <h1>EVA</h1>
  <p-dataScroller  [value]="eva" [rows]="10" [lazy]="true" (onLazyLoad)="loadData($event)" [totalRecords]="eva.length">

          <p-header>
              Extra Vehicular Activity
          </p-header>
          
              <div class="ui-g">
                  <div class="ui-g-12">
                              <ng-template let-walk pTemplate="item">
                          <div class="ui-g" style="border-bottom: 1px solid grey;">
                          <div class=" ui-sm-6 ui-md-3 ui-lg-2 ui-xl-1 ui-g-3">EVA number: </div>
                          <div class="ui-sm-6 ui-md-9 ui-xl-11 ui-g-9">{{walk.eva}}</div>

                          <div class=" ui-sm-6 ui-md-3 ui-lg-2 ui-xl-1 ui-g-3">Country: </div>
                          <div class="ui-sm-6 ui-md-9 ui-xl-11 ui-g-9">{{walk.country}}</div>

                          <div class=" ui-sm-6 ui-md-3 ui-lg-2 ui-xl-1 ui-g-3">Crew: </div>
                          <div class="ui-sm-6 ui-md-9 ui-xl-11 ui-g-9">{{walk.crew}}</div>

                          <div class=" ui-sm-6 ui-md-3 ui-lg-2 ui-xl-1 ui-g-3">Date: </div>
                          <div class="ui-sm-6 ui-md-9 ui-xl-11 ui-g-9">{{walk.date}}</div>

                          <div class=" ui-sm-6 ui-md-3 ui-lg-2 ui-xl-1 ui-g-3">Duration: </div>
                          <div class="ui-sm-6 ui-md-9 ui-xl-11 ui-g-9">{{walk.duration}}</div>

                          <div class=" ui-sm-6 ui-md-3 ui-lg-2 ui-xl-1 ui-g-3">Vehicle: </div>
                          <div class="ui-sm-6 ui-md-9 ui-xl-11 ui-g-9">{{walk.vehicle}}</div>

                          <div class=" ui-sm-6 ui-md-3 ui-lg-2 ui-xl-1 ui-g-3">Purpose: </div>
                          <div class="ui-sm-6 ui-md-9 ui-xl-11 ui-g-9">{{walk.purpose}}</div>
                          </div>
                      </ng-template>
                  </div>
              </div>
      </p-dataScroller>
  </div>
  </div>
  `,
  styles: []
})
export class EvaComponent {
  socket: any;
  eva = [];
  isLoading: boolean = false;

  constructor() {
    this.isLoading = true;
    this.socket = SocketService.getInstance();
    this.socket.on("recieve eva", data => {
      this.eva = data;
      this.isLoading = false;
    });
    this.socket.emit("get eva");
  }
  loadData(event: any){
    console.log(event)
  }
  keys(data): Array<string> {
    return Object.keys(data);
  }
}
