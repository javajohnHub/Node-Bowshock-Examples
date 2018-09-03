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
import {DataViewModule} from 'primeng/dataview';

import {OrderListModule} from 'primeng/orderlist';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { DonkiComponent } from './components/donki/donki.component';
import { CMEComponent } from './components/donki/cme/cme.component';
import { CMEAComponent } from './components/donki/cmea/cmea.component';
import { FLRComponent } from './components/donki/flr/flr.component';
import { GSTComponent } from './components/donki/gst/gst.component';
import { HSSComponent } from './components/donki/hss/hss.component';
import { IPSComponent } from './components/donki/ips/ips.component';
import { MPCComponent } from './components/donki/mpc/mpc.component';
import { RBEComponent } from './components/donki/rbe/rbe.component';
import { SEPComponent } from './components/donki/sep/sep.component';
import { WSASimComponent } from './components/donki/wsasim/wsasim.component';
import { NotificationsComponent } from './components/donki/notifications/notifications.component';
import { MyPanelMenuModule } from './shared/my-panel-menu';
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
    ManifestComponent,
    DonkiComponent,
    CMEComponent,
    CMEAComponent,
    FLRComponent,
    GSTComponent,
    HSSComponent,
    IPSComponent,
    MPCComponent,
    RBEComponent,
    SEPComponent,
    WSASimComponent,
    NotificationsComponent
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
    AccordionModule,
    DataViewModule,
    OrderListModule,
    OverlayPanelModule,
    MyPanelMenuModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
