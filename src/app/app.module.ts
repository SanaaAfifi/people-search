import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule} from '@angular/material/card';  
@NgModule({
  declarations: [AppComponent, SearchPageComponent],
  imports: [BrowserModule, AppRoutingModule, DragDropModule, HttpClientModule,MatCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
