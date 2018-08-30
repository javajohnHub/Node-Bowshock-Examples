import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NoContentComponent} from './components/no-content/no-content';
import {HomeComponent} from './components/home/home.component';
import {ApodComponent} from './components/apod/apod.component';
import {MarsComponent} from './components/mars/mars.component';
import {CuriosityComponent} from './components/mars/curiosity/curiosity.component';
import {OpportunityComponent} from './components/mars/opportunity/opportunity.component';
import {SpiritComponent} from './components/mars/spirit/spirit.component';
import {NeowsComponent} from './components/neows/neows.component';
import {FeedComponent} from './components/neows/feed/feed.component';
import {EvaComponent} from './components/eva/eva.component';
import {TodayComponent} from './components/neows/today/today.component';
import { ManifestComponent } from './components/mars/manifest/manifest.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'apod',
    component: ApodComponent
  },
  {
    path: 'eva',
    component: EvaComponent
  },
  { path: 'mars', component: MarsComponent,
    children: [
      { path: 'curiosity', component: CuriosityComponent},
      {path: 'opportunity', component: OpportunityComponent},
      {path: 'spirit', component: SpiritComponent},
      {path: 'manifest', component: ManifestComponent}
    ]},
  { path: 'neows', component: NeowsComponent,
    children: [
      { path: 'feed', component: FeedComponent},
      { path: 'today', component: TodayComponent}
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
