import { Component } from "@angular/core";
import { SocketService } from "../../shared/socket.service";

@Component({
  selector: "app-eva",
  templateUrl: 'eva.component.html'
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
