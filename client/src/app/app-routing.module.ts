import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoContentComponent } from './components/no-content/no-content';
import { HomeComponent } from './components/home/home.component';
import { ApodComponent } from './components/apod/apod.component';
import { MarsComponent } from './components/mars/mars.component';
import { CuriosityComponent } from './components/mars/curiosity/curiosity.component';
import { OpportunityComponent } from './components/mars/opportunity/opportunity.component';
import { SpiritComponent } from './components/mars/spirit/spirit.component';
import { NeowsComponent } from './components/neows/neows.component';
import { FeedComponent } from './components/neows/feed/feed.component';
import { EvaComponent } from './components/eva/eva.component';
import { TodayComponent } from './components/neows/today/today.component';
import { ManifestComponent } from './components/mars/manifest/manifest.component';
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
import { NaturalComponent } from './components/epic/natural/natural.component';
import { EnhancedComponent } from './components/epic/enhanced/enhanced.component';
import { EPICComponent } from './components/epic/epic.component';
import { EONETComponent } from './components/eonet/eonet.component';
import { EventsComponent } from './components/eonet/events/events.component';
import { LayersComponent } from './components/eonet/layers/layers.component';
import { CategoriesComponent } from './components/eonet/categories/categories.component';
import { SourcesComponent } from './components/eonet/sources/sources.component';
import { GeneLabComponent } from './components/geneLab/geneLab.component';
import { PatentComponent } from './components/patents/patent.component';
import { ExoPlanetComponent } from './components/exoPlanet/exoPlanet.component';
import { SkymorphComponent } from './components/skymorph/skymorph.component';
import { SearchComponent } from './components/vid-and-image/search/search.component';
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
	{
		path: 'genelab',
		component: GeneLabComponent
	},
	{
		path: 'patents',
		component: PatentComponent
	},
	{
		path: 'img-video-library',
		component: SearchComponent
	},
	{
		path: 'exoplanets',
		component: ExoPlanetComponent
	},
	{
		path: 'skymorph',
		component: SkymorphComponent
	},
	{
		path: 'mars',
		component: MarsComponent,
		children: [
			{ path: 'curiosity', component: CuriosityComponent },
			{ path: 'opportunity', component: OpportunityComponent },
			{ path: 'spirit', component: SpiritComponent },
			{ path: 'manifest', component: ManifestComponent }
		]
	},
	{
		path: 'neows',
		component: NeowsComponent,
		children: [
			{ path: 'feed', component: FeedComponent },
			{ path: 'today', component: TodayComponent }
		]
	},
	{
		path: 'eonet',
		component: EONETComponent,
		children: [
			{ path: 'layers', component: LayersComponent },
			{ path: 'sources', component: SourcesComponent },
			{ path: 'events', component: EventsComponent },
			{ path: 'categories', component: CategoriesComponent }
		]
	},
	{
		path: 'epic',
		component: EPICComponent,
		children: [
			{ path: 'natural', component: NaturalComponent },
			{ path: 'enhanced', component: EnhancedComponent }
		]
	},
	{
		path: 'donki',
		component: DonkiComponent,
		children: [
			{
				path: 'cme',
				component: CMEComponent
			},
			{ path: 'cme/:startDate', component: CMEComponent },
			{ path: 'cme/:startDate/:id', component: CMEComponent },
			{
				path: 'cmea',
				component: CMEAComponent
			},
			{ path: 'cmea/:startDate', component: CMEAComponent },
			{ path: 'cmea/:startDate/:id', component: CMEAComponent },

			{
				path: 'flr',
				component: FLRComponent
			},
			{ path: 'flr/:startDate', component: FLRComponent },
			{ path: 'flr/:startDate/:id', component: FLRComponent },
			{
				path: 'gst',
				component: GSTComponent
			},
			{ path: 'gst/:startDate', component: GSTComponent },
			{ path: 'gst/:startDate/:id', component: GSTComponent },
			{
				path: 'hss',
				component: HSSComponent
			},
			{ path: 'hss/:startDate', component: HSSComponent },
			{ path: 'hss/:startDate/:id', component: HSSComponent },
			{
				path: 'ips',
				component: IPSComponent
			},
			{ path: 'ips/:startDate', component: IPSComponent },
			{ path: 'ips/:startDate/:id', component: IPSComponent },
			{
				path: 'mpc',
				component: MPCComponent
			},
			{ path: 'mpc/:startDate', component: MPCComponent },
			{ path: 'mpc/:startDate/:id', component: MPCComponent },
			{
				path: 'rbe',
				component: RBEComponent
			},
			{ path: 'rbe/:startDate', component: RBEComponent },
			{ path: 'rbe/:startDate/:id', component: RBEComponent },
			{
				path: 'sep',
				component: SEPComponent
			},
			{ path: 'sep/:startDate', component: SEPComponent },
			{ path: 'sep/:startDate/:id', component: SEPComponent },

			{ path: 'wsasim', component: WSASimComponent },
			{ path: 'notifications', component: NotificationsComponent }
		]
	},
	{ path: '**', component: NoContentComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class FrontRoutingModule {}
