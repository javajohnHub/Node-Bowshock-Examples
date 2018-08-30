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
        <p-dropdown [options]="sols" [(ngModel)]="selectedSol" (onChange)="solSelected(selectedSol)"></p-dropdown>        
        </div>
    </div>
    <div *ngIf="manifest && manifest.name">
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
  
 Cameras:
 <p-dropdown [options]="cameras" [(ngModel)]="selectedCamera" (onChange)="cameraSelected(selectedCamera)"></p-dropdown>
 <div class="ui-g-12" *ngFor="let camera of cameras">
 
 <li>{{camera | json}}</li>
 </div>
 </div>
    </div>

    <div class="ui-g-12" *ngIf="photos">
    <div *ngFor="let photo of photos.photos;">
      <img src="{{photo.img_src}}"/>
    </div>
    </div>
 
  </div>
    
    
  `
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
      this.manifest.photos.forEach(photo => {
        for(let i = 0; i < photo.max_sol; i++){
          this.sols.push({ label: photo.sol, value: photo.sol });
          photo.cameras.forEach(camera => {
            this.cameras.push({ label: camera, value: camera });
          });
        }
        
      });
    });
    
    this.socket.on("send rover by param", photos => {
      console.log(photos)
      this.manifest = [];
      this.photos = photos;
    });
    
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
}
