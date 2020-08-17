import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card'; 

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel'; 
import {  MatTabsModule} from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination'; 

         

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    SlickCarouselModule,
    MatTabsModule,
    NgxPaginationModule
    
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
