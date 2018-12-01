import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TemporadasComponent } from './components/temporadas/temporadas.component';
import { EpisodiosComponent } from './components/episodios/episodios.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { QualitiesComponent } from './components/qualities/qualities.component';
import { DownloadComponent } from './components/download/download.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DownloadQueueComponent } from './components/download-queue/download-queue.component';
import { FabQueueComponent } from './components/fab-queue/fab-queue.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfigComponent } from './components/config/config.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DownloadProgressComponent } from './components/download-progress/download-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    TemporadasComponent,
    EpisodiosComponent,
    LanguagesComponent,
    QualitiesComponent,
    DownloadComponent,
    DownloadQueueComponent,
    FabQueueComponent,
    LoadingComponent,
    ConfigComponent,
    BreadcrumbComponent,
    DownloadProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
