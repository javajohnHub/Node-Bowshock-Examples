import { Component } from "@angular/core";
import { SocketService } from "../../../shared/socket.service";
import { SelectItem } from "primeng/api";
@Component({
  selector: "app-manifest",
  template: `
  <h1 class="ui-g ui-g-offset-5">Manifest</h1>
  <div class="ui-g ui-fluid">
    <div class="ui-g-12">
        <div class="ui-inputgroup">
        <p-dropdown [options]="rovers" [(ngModel)]="selectedRover" (onChange)="roverSelected(selectedRover)"></p-dropdown>        
        </div>
        <div class="ui-inputgroup" *ngIf="sols">
        <p-dropdown [options]="sols" [(ngModel)]="selectedSol" (onChange)="solSelected(selectedSol)"></p-dropdown>        
        </div>

    </div>
    <div *ngIf="manifest">
    <ul>
    <li>Rover: {{manifest.name}}</li>
    <li>Landing Date: {{manifest.landing_date}}</li>
    <li>Launch Date: {{manifest.launch_date}}</li>
    <li>Status: {{manifest.status}}</li>
    <li>Max Sol: {{manifest.max_sol}}</li>
    <li>Max Date: {{manifest.max_date}}</li>
    <li>Total Photos: {{manifest.total_photos}}</li>
    </ul>
    
  <div *ngFor="let item of manifest.photos">
  Photos:
  <li>Sol: {{item.sol}}</li>
  <li>Earth Date: {{item.earth_date}}</li>
  <li>Total Photos: {{item.total_photos}}</li>
  <div class="ui-inputgroup">
        <p-dropdown [options]="item.cameras" [(ngModel)]="selectedCamera" (onChange)="cameraSelected(selectedCamera)"></p-dropdown>        
        </div>
 Cameras:
 <div class="ui-g-12" *ngFor="let camera of item.cameras">
 <li>{{camera}}</li>
 </div>
 </div>
    </div>

    
 
  </div>
    
    
  `
})
export class ManifestComponent {
  socket: any;
  manifest;
  selectedRover;
  selectedCamera;
  cameras;
  sols = [];
  selectedSol;
  photos = [];
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
    if (this.manifest) {
      this.manifest.photos.forEach(photo => {
        this.sols.push(photo.sol);
        photo.cameras.forEach(camera => {
          this.cameras.push({ label: camera, value: camera });
        });
      });
    }

    this.socket.on("send manifest", manifest => {
      this.manifest = manifest.photo_manifest;
    });
    this.socket.on("send rover by camera", manifest => {
      this.photos = manifest;
    });
    this.socket.on("send rover by sol ", manifest => {
      this.photos = manifest;
    });
    this.socket.on("send rover by sol and camera ", manifest => {
      this.photos  = manifest;
    });
  }

  roverSelected(selectedRover): void {
    this.selectedRover = selectedRover;
    this.socket.emit("get manifest", { rover: this.selectedRover });
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
}
