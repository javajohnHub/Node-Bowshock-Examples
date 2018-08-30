import { Component } from '@angular/core';
import {SocketService} from '../../../shared/socket.service';

@Component({
  selector: 'app-manifest',
  template: `
  <h1 class="ui-g ui-g-offset-5">Manifest</h1>
  <div class="ui-g ui-fluid">
    <div class="ui-g-12">
        <div class="ui-inputgroup">
        <p-dropdown [options]="rovers" [(ngModel)]="selectedRover" (ngModelChange)="roverSelected()"></p-dropdown>        
        </div>
    </div>
 <div class="ui-g-12" *ngFor="let item of manifest">
 {{item | json}}
 </div>
  </div>
    
    
  `
})
export class ManifestComponent {
  socket: any;
  manifest;
  selectedRover;
  rovers;
  constructor() {
    this.socket = SocketService.getInstance();
    this.rovers = ['Curiousity', 'Opportunity', 'Spirit']
    this.socket.on('send manifest', (manifest) => {
      this.manifest = manifest;
    });
    
  }
  
  roverSelected(): void {
    this.socket.emit('get manifest', this.selectedRover )
  }


}
