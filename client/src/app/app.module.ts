import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import {routing} from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NoContentComponent } from './components/no-content/no-content';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApodComponent } from './components/apod/apod.component';
import {MarsComponent} from './components/mars/mars.component';
import {CuriosityComponent} from './components/mars/curiosity/curiosity.component';
import {OpportunityComponent} from './components/mars/opportunity/opportunity.component';
import {SpiritComponent} from './components/mars/spirit/spirit.component';
import {NeowsComponent} from './components/neows/neows.component';
import {FeedComponent} from './components/neows/feed/feed.component';
import { EvaComponent } from './components/eva/eva.component';

import {BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
    NavbarComponent,
    ApodComponent,
    MarsComponent,
    CuriosityComponent,
    OpportunityComponent,
    SpiritComponent,
    NeowsComponent,
    FeedComponent,
    EvaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    NgxMyDatePickerModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
