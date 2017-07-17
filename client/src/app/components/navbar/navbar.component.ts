import { Component } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
  public isCollapsed:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  public rovers:Array<string> = ['curiosity', 'opportunity', 'spirit'];
  public neows:Array<string> = ['feed', 'today'];
  constructor(private router: Router){

  }

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }



}
