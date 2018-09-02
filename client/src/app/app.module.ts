import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import {routing} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NoContentComponent } from './components/no-content/no-content';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApodComponent } from './components/apod/apod.component';
import {MarsComponent} from './components/mars/mars.component';
import {CuriosityComponent} from './components/mars/curiosity/curiosity.component';
import {SpiritComponent} from './components/mars/spirit/spirit.component';
import {NeowsComponent} from './components/neows/neows.component';
import {FeedComponent} from './components/neows/feed/feed.component';
import {TodayComponent} from './components/neows/today/today.component';
import { EvaComponent } from './components/eva/eva.component';
import { ZippyComponent } from './components/zippy/zippy.component';

import {CalendarModule} from 'primeng/calendar';
import {GalleriaModule} from 'primeng/galleria';
import { OpportunityComponent } from './components/mars/opportunity/opportunity.component';
import {CardModule} from 'primeng/card';
import {PanelMenuModule} from 'primeng/panelmenu';
import {DropdownModule} from 'primeng/dropdown'
import { ManifestComponent } from './components/mars/manifest/manifest.component';
import {InputTextModule} from 'primeng/inputtext';
import {DataScrollerModule} from 'primeng/datascroller';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {AccordionModule} from 'primeng/accordion';
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
    EvaComponent,
    TodayComponent,
    ZippyComponent,
    ManifestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routing,
    CalendarModule,
    GalleriaModule,
    CardModule,
    PanelMenuModule,
    DropdownModule,
    InputTextModule,
    DataScrollerModule,
    ButtonModule,
    ProgressSpinnerModule,
    AccordionModule
    


  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
