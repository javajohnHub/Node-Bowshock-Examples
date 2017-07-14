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

import {CollapseModule } from 'ngx-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
    NavbarComponent,
    ApodComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    CollapseModule.forRoot(),
    NgxMyDatePickerModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
