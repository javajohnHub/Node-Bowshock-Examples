import { Component, Output, EventEmitter} from '@angular/core';
import { SharedService } from '../../shared/shared.service';


@Component({
  selector: 'app-donki',
  template: `

    <router-outlet></router-outlet>
  `
  ,
  styles: [],

})

export class DonkiComponent {
  constructor (private _sharedService: SharedService) {}

  ngOnInit(){
    this._sharedService.subTitle = 'Space Weather Database Of Notifications, Knowledge, Information'
  }


}
