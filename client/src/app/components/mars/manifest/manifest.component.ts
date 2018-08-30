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
    <div class="ui-g-12" *ngIf="manifest">
    {{manifest.name}}
    {{manifest.landing_date}}
    {{manifest.launch_date}}
    {{manifest.status}}
    {{manifest.max_sol}}
    {{manifest.max_date}}
    {{manifest.total_photos}}
    <div class="ui-g-12" *ngFor="let item of manifest.photos">
 {{item.sol}}
 {{item.earth_date}}
 {{item.total_photos}}
 <div class="ui-g-12" *ngFor="let camera of item.cameras">
 {{item.camera}}
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
