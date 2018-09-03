import { Component } from "@angular/core";
import { SocketService } from "../../../shared/socket.service";

@Component({
  selector: "app-cme",
  templateUrl: "cme.component.html"
})
export class CMEComponent {
  socket: any;
  cme;
  startModel: Date;
  endModel: Date;
  constructor() {}

  ngOnInit() {
    this.socket = SocketService.getInstance();
    this.startModel = new Date();
    this.socket.on("send cme", cme => {
      this.cme = cme;
    });
    let myDate = this.startModel.toISOString().split('T')[0]
    let last = parseInt(myDate.split('-')[2]);
    let str = myDate.split('-')[0] + '-' + myDate.split('-')[1] + '-' + last;
    this.socket.emit('get cme', str);
  }

  getCME(start, end){
    if(end == null){
      this.startModel = new Date(start);
      let myDate = this.startModel.toISOString().split('T')[0]
      this.socket.emit("get cme", {startDate: myDate})
    }else{
      this.startModel = new Date(start);
      this.endModel = new Date(end);
      let myStart = this.startModel.toISOString().split('T')[0]
      let myEnd = this.endModel.toISOString().split('T')[0]
      this.socket.emit("get cme", {startDate: myStart, endDate: myEnd})
    }
    
  }
}
