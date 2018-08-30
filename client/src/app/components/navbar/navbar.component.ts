import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
  items: MenuItem[];

  public rovers:Array<string> = ['curiosity', 'opportunity', 'spirit'];
  public neows:Array<string> = ['feed', 'today'];

  
  constructor(private router: Router){
    this.items = [
      {
          label: 'Navigation',
          icon: 'pi pi-pw pi-file',
          items: [
              {label: 'Open', icon: 'pi pi-fw pi-external-link'},
              {separator: true},
              {label: 'Quit', icon: 'pi pi-fw pi-times'}
          ]
      }
    ]
  }

  



}
