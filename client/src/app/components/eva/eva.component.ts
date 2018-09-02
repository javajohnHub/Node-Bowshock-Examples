import { Component } from "@angular/core";
import { SocketService } from "../../shared/socket.service";

@Component({
  selector: "app-eva",
  templateUrl: "eva.component.html"
})
export class EvaComponent {
  socket: any;
  eva = [];
  isLoading: boolean = false;
  copy;
  model;
  constructor() {
    this.isLoading = true;
    this.socket = SocketService.getInstance();
    this.socket.on("recieve eva", data => {
      this.eva = data
      this.model = 0;
      this.copy = JSON.parse(JSON.stringify(this.eva));
      
      this.isLoading = false;
    });
    this.socket.emit("get eva");
  }

  getEVA() {
    this.eva = JSON.parse(JSON.stringify(this.copy));
    console.log(this.eva, this.model)
    let found = this.eva.find(obj => obj.eva == this.model)
    if (found) {
      this.eva = [found];
    }
  }
  loadData(event: any) {
    console.log(event);
  }
  keys(data): Array<string> {
    return Object.keys(data);
  }
}
