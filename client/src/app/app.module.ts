import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routing } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NoContentComponent } from './components/no-content/no-content';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApodComponent } from './components/apod/apod.component';
import { MarsComponent } from './components/mars/mars.component';
import { CuriosityComponent } from './components/mars/curiosity/curiosity.component';
import { SpiritComponent } from './components/mars/spirit/spirit.component';
import { NeowsComponent } from './components/neows/neows.component';
import { FeedComponent } from './components/neows/feed/feed.component';
import { TodayComponent } from './components/neows/today/today.component';
import { EvaComponent } from './components/eva/eva.component';
import { ZippyComponent } from './components/zippy/zippy.component';

import { CalendarModule } from 'primeng/calendar';
import { GalleriaModule } from 'primeng/galleria';
import { OpportunityComponent } from './components/mars/opportunity/opportunity.component';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ManifestComponent } from './components/mars/manifest/manifest.component';
import { InputTextModule } from 'primeng/inputtext';
import { DataScrollerModule } from 'primeng/datascroller';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';
import { DataViewModule } from 'primeng/dataview';

import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
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
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';
import { EPICComponent } from './components/epic/epic.component';
import { NaturalComponent } from './components/epic/natural/natural.component';
import { EnhancedComponent } from './components/epic/enhanced/enhanced.component';
import { EONETComponent } from './components/eonet/eonet.component';
import { CategoriesComponent } from './components/eonet/categories/categories.component';
import { LayersComponent } from './components/eonet/layers/layers.component';
import { EventsComponent } from './components/eonet/events/events.component';
import { SourcesComponent } from './components/eonet/sources/sources.component';
import { GeneLabComponent } from './components/geneLab/geneLab.component';
import { PatentComponent } from './components/patents/patent.component';
import { ExoPlanetComponent } from './components/exoPlanet/exoPlanet.component';
import { SkymorphComponent } from './components/skymorph/skymorph.component';
import { SearchComponent } from './components/vid-and-image/search/search.component';
import { EarthComponent } from './components/Earth/earth.component';

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
		NotificationsComponent,
		EPICComponent,
		NaturalComponent,
		EnhancedComponent,
		EONETComponent,
		CategoriesComponent,
		LayersComponent,
		EventsComponent,
		SourcesComponent,
		GeneLabComponent,
		PatentComponent,
		ExoPlanetComponent,
		SkymorphComponent,
		SearchComponent,
		EarthComponent
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
		MyPanelMenuModule,
		CheckboxModule,
		InputSwitchModule,
		ReactiveFormsModule,
		PanelModule
	],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
	bootstrap: [AppComponent]
})
export class AppModule {}
