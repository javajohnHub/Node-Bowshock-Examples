import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NoContentComponent} from './components/no-content/no-content';
import {HomeComponent} from './components/home/home.component';
import {ApodComponent} from './components/apod/apod.component';
import {MarsComponent} from './components/mars/mars.component';
import {CuriosityComponent} from './components/mars/curiosity/curiosity.component';
import {OpportunityComponent} from './components/mars/opportunity/opportunity.component';
import {SpiritComponent} from './components/mars/spirit/spirit.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'apod',
    component: ApodComponent
  },
  { path: 'mars', component: MarsComponent,
    children: [
      { path: 'curiosity', component: CuriosityComponent},
      {path: 'opportunity', component: OpportunityComponent},
      {path: 'spirit', component: SpiritComponent}

      /*{ path: 'books', component: BookSearchComponent }*/
    ]},
  { path: '**',    component: NoContentComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class FrontRoutingModule { }
