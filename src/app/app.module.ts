import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http"
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SongComponent } from './components/song/song.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { ButtonComponent } from './components/button/button.component';
import { SongFormComponent } from './components/song-form/song-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    SongListComponent,
    ButtonComponent,
    SongFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
