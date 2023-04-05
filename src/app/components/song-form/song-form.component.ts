import { Component, Output, EventEmitter } from '@angular/core';
import { Song  } from 'src/app/Interfaces/Song';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent {
  @Output() onAddSong:EventEmitter<Song> = new EventEmitter();
  artist:string;
  name:string
  votes:number = 0;
  entryTopDate:string = new Date().toLocaleString('en-GB').slice(0,17);

  onSubmit(){
     if(!this.artist){
      alert("please add an artist")
      return;
     } 
     if(!this.name){
      alert("please add a song")
      return;
     }

    const newSong = {
      artist:this.artist,
      name:this.name,
      votes:this.votes,
      entryTopDate:this.entryTopDate
    }

    this.onAddSong.emit(newSong);

    this.artist="";
    this.name="";
  }
}
