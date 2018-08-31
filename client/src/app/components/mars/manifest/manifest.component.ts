import { Component } from "@angular/core";
import { SocketService } from "../../../shared/socket.service";
import { SelectItem } from "primeng/api";
import { Subscription, of } from "rxjs";
@Component({
  selector: "app-manifest",
  templateUrl: "manifest.component.html"
})
export class ManifestComponent {
  socket: any;
  manifest: any = {};
  selectedRover;
  selectedCamera;
  cameras;
  sols;
  selectedSol;
  photos;
  rovers: SelectItem[];
  constructor() {
    
  }

  loadData(event) {
    console.log(event);
  }
  ngOnInit() {
    this.socket = SocketService.getInstance();
    this.rovers = [
      { label: "Select Rover", value: null },
      { label: "Curiosity", value: "curiosity" },
      { label: "Opportunity", value: "opportunity" },
      { label: "Spirit", value: "spirit" }
    ];
   
   

    this.socket.on("send manifest", manifest => {
      this.manifest = manifest.photo_manifest;
      this.photos = null;
    });
    this.socket.emit("get manifest", {
      rover: 'curiosity'
    });
    this.selectedRover = 'curiosity';
    this.socket.on("send rover by param", photos => {
      console.log(photos);
      this.manifest = null;
      this.photos = photos;
    });
    
  }

  ngOndestroy(){
  }
  roverSelected(selectedRover): void {
    this.selectedRover = selectedRover;
    this.socket.emit("get manifest", {
      rover: this.selectedRover
    });
  }

  cameraChosen(selectedCamera): void {
    this.selectedCamera = selectedCamera;
    this.socket.emit("get manifest", {
      rover: this.selectedRover,
      camera: this.selectedCamera
    });
  }
  solChosen(selectedSol): void {
    this.selectedSol = selectedSol;
    
      this.socket.emit("get manifest", {
        rover: this.selectedRover,
        sol: this.selectedSol
      });
  }
  getColor(active: string) {
    if (active !== "active") {
      return "red";
    } else {
      return "green";
    }
  }
}
