import { Component } from "@angular/core";
import { SocketService } from "../../../shared/socket.service";
import { SelectItem } from "primeng/api";
import { deepCopy } from "../../../shared/deepCopy";
@Component({
  selector: "app-manifest",
  templateUrl: "manifest.component.html"
})
export class ManifestComponent {
  socket: any;
  manifest: any = {};
  selectedRover;
  selectedCamera;
  selectedSol;
  photos;
  sol: string;
  rovers: SelectItem[];
  isLoading: boolean = false;
  maxDate: Date;
  copy;
  constructor() {}

  getSol() {
    this.manifest = JSON.parse(JSON.stringify(this.copy));
    let found = this.manifest.photos.find(photo => {
      return parseInt(photo.sol, 10) === parseInt(this.sol, 10)
    })
    if(found){
      this.manifest.photos = [found];
    }
  }
  
  loadData(event) {
    console.log(event);
  }
  ngOnInit() {
    this.maxDate = new Date();
    this.isLoading = true;
    this.socket = SocketService.getInstance();
    this.rovers = [
      { label: "Select Rover", value: null },
      { label: "Curiosity", value: "curiosity" },
      { label: "Opportunity", value: "opportunity" },
      { label: "Spirit", value: "spirit" }
    ];

    this.socket.on("send manifest", manifest => {
      this.manifest = manifest.photo_manifest;
      this.copy = JSON.parse(JSON.stringify(manifest.photo_manifest));
      this.photos = null;
      this.isLoading = false;
    });
    this.socket.emit("get manifest", {
      rover: "curiosity"
    });
    this.selectedRover = "curiosity";
    this.socket.on("send rover by param", photos => {
      this.photos = photos.photos;
      console.log(photos);
      this.manifest = JSON.parse(JSON.stringify(this.copy));
      this.isLoading = false;
    });
  }

  ngOndestroy() {}
  backClicked() {
    this.isLoading = true;
    this.socket.emit("get manifest", {
      rover: this.selectedRover
    });
    this.photos = null;
  }
  roverSelected(selectedRover): void {
    this.isLoading = true;
    this.selectedRover = selectedRover;
    this.socket.emit("get manifest", {
      rover: this.selectedRover
    });
  }

  cameraChosen(selectedCamera, sol): void {
    this.isLoading;
    this.selectedCamera = selectedCamera;
    this.socket.emit("get manifest", {
      rover: this.selectedRover,
      camera: this.selectedCamera,
      sol: sol
    });
  }
  solChosen(selectedSol): void {
    this.isLoading;
    this.selectedSol = selectedSol;
    console.log(this.selectedSol, this.selectedRover);
    this.socket.emit("get manifest", {
      rover: this.selectedRover,
      sol: this.selectedSol
    });
  }
  getColor(active: string) {
    if (active !== "active") {
      return "red";
    } else {
      return "lightgreen";
    }
  }
}
