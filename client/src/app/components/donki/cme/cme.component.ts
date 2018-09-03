import { Component } from "@angular/core";
import { SocketService } from "../../../shared/socket.service";

export interface Instruments {
  id: number;
  displayName: string;
}

export interface CMEAnalyses {
  time21_5: string;
  latitude: number;
  longitude: number;
  halfAngle: number;
  speed: number;
  type: string;
  isMostAccurate: boolean;
  note: string;
  levelOfData: number;
  enlilList: any;
}
export interface CME {
  activityId: Date;
  startTime: Date;
  sourceLocation: string;
  activeRegionNum: number;
  instruments: Instruments[];
  cmeAnalyses: CMEAnalyses[];
  linkedEvents: any;
  note: string;
  catalog: string;
}
@Component({
  selector: "app-cme",
  templateUrl: "cme.component.html"
})
export class CMEComponent {
  socket: any;
  cme: CME;
  startModel: Date;
  endModel: Date;
  constructor() {}

  ngOnInit() {
    this.socket = SocketService.getInstance();
    this.startModel = new Date();
    this.endModel = new Date(this.startModel);
    this.socket.on("send cme", cme => {
      console.log(cme)
      this.cme = cme;
    });
    let myDate = this.startModel.toISOString().split("T")[0];
    let last = parseInt(myDate.split("-")[2]);
    let str = myDate.split("-")[0] + "-" + myDate.split("-")[1] + "-" + last;
    this.socket.emit("get cme", { startDate: str });
  }

  getCME(start, end) {
    if (end == null) {
      this.startModel = new Date(start);
      let myDate = this.startModel.toISOString().split("T")[0];
      this.socket.emit("get cme", { startDate: myDate });
    } else {
      this.startModel = new Date(start);
      this.endModel = new Date(end);
      let myStart = this.startModel.toISOString().split("T")[0];
      let myEnd = this.endModel.toISOString().split("T")[0];
      this.socket.emit("get cme", { startDate: myStart, endDate: myEnd });
    }
  }
}
