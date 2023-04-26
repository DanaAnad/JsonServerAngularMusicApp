import { Component, Input} from '@angular/core';
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
  searchResult: boolean|null = null;
  isEditMode = false;

  @Input() songs: Song[] = [];
  
  onEditSong(id:number){
    this.songId=id;
    this.isEditMode = true;
  }
 
  ngOnInit():void {
    this.getSongsByVoteNr();
    this.editSong();
  }
  getSongsByVoteNr(){
    this.songService.getSongs().subscribe(songs => (this.songs = songs.sort((a,b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : (a.entryTopDate > b.entryTopDate) ? -1 : (a.entryTopDate < b.entryTopDate) ? 1 : 0)));
  }

  deleteSong(song:Song) {
    this.songService.deleteSong(song).subscribe(() => (this.songs = this.songs.filter(s => s.id !== song.id))); 
  };

  addSong(song:Song) {
    this.songService.addSong(song).subscribe((song:Song) => (this.songs.push(song)) )
  };

  voteSong(song:Song) {
    this.songService.voteSong(song).subscribe((song:Song) => {
      this.songs.filter(s => s.id === song.id ? s.votes++ : null);
      this.songs.sort((a,b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : (a.entryTopDate > b.entryTopDate) ? -1 : (a.entryTopDate < b.entryTopDate) ? 1 : 0);
    })
  };

  editSong(): void {
    this.songService.updateSongEvent.subscribe((updatedSong: Song) => {
      const index = this.songs.findIndex(s => s.id === updatedSong.id);
      if (index >= 0) {
        this.songs[index] = updatedSong;
      }
    });
  }

  searchSong(searchValue:any): void {
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs.filter(song =>
        searchValue ? song.artist.toLowerCase() === searchValue.toLowerCase() || song.name.toLowerCase() === searchValue.toLowerCase() :true
      );
      this.searchResult = this.songs.length > 0;
    });
  }
  onApply(){
    this.isEditMode=false;
  }

}