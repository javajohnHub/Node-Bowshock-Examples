import { Component } from '@angular/core';
import {SocketService} from '../../shared/socket.service';


@Component({
  selector: 'app-eva',
  template: `
    <div>
      <h1 class="text-center">EVA</h1>
      <div *ngIf="eva">
        {{eva | json}}
      </div>
    </div>
  `,
  styles: []
})
export class EvaComponent {
  socket: any;
  eva: {};

  constructor() {
    this.socket = SocketService.getInstance();
    this.socket.on('recieve eva', (data) => {
      this.eva = JSON.parse(data);
    });
    this.socket.emit('get eva');

  }

}
