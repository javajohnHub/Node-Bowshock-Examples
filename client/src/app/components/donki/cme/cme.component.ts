import { Component } from "@angular/core";
import { SocketService } from "../../../shared/socket.service";

@Component({
  selector: "app-cme",
  templateUrl: "cme.component.html"
})
export class CMEComponent {
  socket: any;
  cme;
  constructor() {}

  ngOnInit() {
    this.socket = SocketService.getInstance();

    this.socket.on("send cme", cme => {
      this.cme = cme;
    });

    this.socket.emit('get cme');
  }
}
