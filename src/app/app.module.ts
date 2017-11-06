import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GtoolbarComponent} from './golbatoolbar/gtoolbar/gtoolbar.component';
import {GsidenavComponent} from './golbatoolbar/gsidenav/gsidenav.component';
import {NavItemComponent} from './golbatoolbar/navitem/navitem.component';
import {TabGroupComponent} from './golbatoolbar/tab-group/tab-group.component';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './shared/material/material.module';
import {SocialModule} from "./social/social.module";

@NgModule({
  declarations: [
    AppComponent,
    GtoolbarComponent,
    GsidenavComponent,
    NavItemComponent,
    TabGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    SocialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
