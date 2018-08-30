import { Component } from '@angular/core';
import {SocketService} from '../../../shared/socket.service';
import {SelectItem} from 'primeng/api';
@Component({
  selector: 'app-manifest',
  template: `
  <h1 class="ui-g ui-g-offset-5">Manifest</h1>
  <div class="ui-g ui-fluid">
    <div class="ui-g-12">
        <div class="ui-inputgroup">
        <p-dropdown [options]="rovers" [(ngModel)]="selectedRover" (onChange)="roverSelected(selectedRover)"></p-dropdown>        
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
  rovers: SelectItem[];
  constructor() {
    this.socket = SocketService.getInstance();
    this.rovers = [
        {label:'Select Rover', value:null},
            {label: 'Curiosity', value: 'curiosity'},
            {label: 'Opportunity', value: 'opportunity'},
            {label: 'Spirit', value: 'spirit'},
    ]
    this.socket.on('send manifest', (manifest) => {
      this.manifest = manifest.photo_manifest;
    });
    
  }
  
  roverSelected(selectedRover): void {
    this.socket.emit('get manifest', selectedRover )
  }


}
