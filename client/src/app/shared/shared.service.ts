import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class SharedService  {

  subTitleSubject$: Subject<string> = new Subject<string>();
  subTitleObservable$ = this.subTitleSubject$.asObservable();
  subTitle: string;
  sub;
  constructor() {
  }

  ngOnInit(){
     this.sub = this.subTitleObservable$.subscribe((subTitle) => {
         this.subTitle = subTitle;
         
     })
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }

  
}