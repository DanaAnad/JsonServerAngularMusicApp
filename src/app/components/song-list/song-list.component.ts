import { Component, ElementRef, Input, QueryList, ViewChildren} from '@angular/core';
import {Song} from "../../Interfaces/Song";
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent  {

  constructor(private songService:SongService){}

  songId:number;
  artist:string="";
  name:string="";

  @Input() songs: Song[] = [];
  
  onEditSong(id:number){
    this.songId=id;
  }
 
  ngOnInit():void {
    this.getSongsByVoteNr();
    this.subscribeToUpdateSongEvent();
  }
  getSongsByVoteNr(){
    this.songService.getSongs().subscribe(songs => (this.songs = songs.sort((a,b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : (a.entryTopDate > b.entryTopDate) ? -1 : (a.entryTopDate < b.entryTopDate) ? 1 : 0)));
  }

  deleteSong(song:Song) {
    this.songService.deleteSong(song).subscribe(() => (this.songs = this.songs.filter(s => s.id !== song.id))); 
  };

  addSong(song:Song) {
    console.log(song);
    this.songService.addSong(song).subscribe((song:Song) => (this.songs.push(song)) )
  };

  voteSong(song:Song) {
    this.songService.voteSong(song).subscribe((song:Song) => {
      this.songs.filter(s => s.id === song.id ? s.votes++ : null);
      this.songs.sort((a,b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : (a.entryTopDate > b.entryTopDate) ? -1 : (a.entryTopDate < b.entryTopDate) ? 1 : 0);
    })
  };

  subscribeToUpdateSongEvent(): void {
    this.songService.updateSongEvent.subscribe((updatedSong: Song) => {
      const index = this.songs.findIndex(s => s.id === updatedSong.id);
      if (index >= 0) {
        this.songs[index] = updatedSong;
      }
    });
  }
  searchSong(artist: string, name: string): void {
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs.filter(song =>
        (artist && name) ? 
          (song.artist === artist && song.name === name) :
          (artist ? song.artist === artist :
          name ? song.name === name : true)
      );
    });
  }

}