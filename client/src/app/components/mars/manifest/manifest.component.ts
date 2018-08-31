import { Component } from "@angular/core";
import { SocketService } from "../../../shared/socket.service";
import { SelectItem } from "primeng/api";
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
    
    this.socket = SocketService.getInstance();
    this.rovers = [
      { label: "Select Rover", value: null },
      { label: "Curiosity", value: "curiosity" },
      { label: "Opportunity", value: "opportunity" },
      { label: "Spirit", value: "spirit" }
    ];
    this.cameras = [{ label: "Select Camera", value: null }];
    this.sols = [{ label: "Select Sol", value: null },{ label: '0', value: '0' }];
    
    this.socket.on("send manifest", manifest => {
      this.manifest = manifest.photo_manifest;
      this.photos = [];
      
      
    });
    
    this.socket.on("send rover by param", photos => {
      console.log(photos)
      this.manifest = [];
      this.photos = photos;
    });
    
  }

  loadData(event){
    console.log(event)
  }
  ngOnInit(){
    if(this.manifest){
      for(let i = 0; i < this.manifest.photos.length; i++){
        this.manifest.photos.forEach(photo => {
          console.log(this.manifest.max_sol, photo.total_photos)
          
            this.sols.push({ label: photo.sol, value: photo.sol });
            photo.cameras.forEach(camera => {
              this.cameras.push({ label: camera, value: camera });
            });
          
          
        });
      }
    }
  }
  roverSelected(selectedRover): void {
    
    
  }

  cameraSelected(selectedCamera): void {
    this.selectedCamera = selectedCamera;
    if (this.selectedRover) {
      if (!this.selectedSol) {
        
        this.socket.emit("get manifest", {rover: this.selectedRover, camera: this.selectedCamera});
      } else {
        this.socket.emit("get manifest", {
          rover: this.selectedRover,
          camera: this.selectedCamera,
          sol: this.selectedSol
        });
      }
    } else {
      console.log("must select a rover first");
    }
  }
  solSelected(selectedSol): void {
    this.selectedSol = selectedSol;
    if (this.selectedRover) {
      if (!this.selectedCamera) {
        this.socket.emit("get manifest", {rover: this.selectedRover, sol: this.selectedSol});
      } else {
        this.socket.emit("get manifest", {
          rover: this.selectedRover,
          sol: this.selectedSol,
          camera: this.selectedCamera
        });
      }
    } else {
      console.log("must select a rover first");
    }
  }
  getColor(active: string) {
    if (active !== 'active') {
      return 'red';
    } else {
      return 'green';
    }
  }
}
