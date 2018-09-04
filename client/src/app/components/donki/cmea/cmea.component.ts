import { Component } from "@angular/core";
import { SocketService } from "../../../shared/socket.service";
import { SharedService } from "../../../shared/shared.service";
import * as moment from "moment";

export interface CMEA {
  time21_5: string;
  latitude: number;
  longitude: number;
  halfAngle: number;
  speed: number;
  type: string;
  isMostAccurate: boolean;
  associatedCMEID: string;
  note: string;
  catalog: string;
}

@Component({
  selector: "app-cmea",
  templateUrl: "cmea.component.html"
})
export class CMEAComponent {
  socket: any;
  cmea: CMEA[];
  startModel: Date = new Date(
    moment()
      .subtract(30, "days")
      .format()
  );
  endModel: Date = new Date(
    moment()
      .subtract(30, "days")
      .format()
  );
  maxStartDate: Date = new Date(
    moment()
      .subtract(30, "days")
      .format()
  );
  maxEndDate: Date = new Date(
    moment()
      .subtract(30, "days")
      .format()
  );
  isLoading: boolean = false;
  constructor(private _sharedService: SharedService) {}

  ngOnInit() {
    this.isLoading = true;
    this._sharedService.subTitleSubject$.next(
      "DONKI/Coronal Mass Ejection Analysis"
    );
    this.socket = SocketService.getInstance();
    this.socket.on("send cmea", cmea => {
      this.cmea = cmea;
      this.isLoading = false;
    });

    this.socket.emit("get cmea", {
      startDate: moment(this.startModel).format("YYYY-MM-DD")
    });
  }

  goToAssoc(date) {
    this.isLoading = true;

    let newDate = date.split("T");
    this.startModel = new Date(moment(newDate[0]).format("YYYY-MM-DD"));
    this.socket.emit("get cmea", {
      startDate: moment(newDate[0]).format("YYYY-MM-DD")
    });
  }

  setCMEADate() {
    this.isLoading = true;
    if (
      moment(this.startModel).format("YYYY-MM-DD") ==
      moment(this.endModel).format("YYYY-MM-DD")
    ) {
      this.socket.emit("get cmea", {
        startDate: moment(this.startModel).format("YYYY-MM-DD")
      });
    }
    if (
      moment(this.startModel).format("YYYY-MM-DD") >
      moment(this.endModel).format("YYYY-MM-DD")
    ) {
      this.endModel = new Date(
        moment()
          .subtract(30, "days")
          .format()
      );
      this.socket.emit("get cmea", {
        startDate: moment(this.startModel).format("YYYY-MM-DD")
      });
    } else {
      this.socket.emit("get cmea", {
        startDate: moment(this.startModel).format("YYYY-MM-DD"),
        endDate: moment(this.endModel).format("YYYY-MM-DD")
      });
    }
  }
}
