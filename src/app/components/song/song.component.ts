import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {Song} from "../../Interfaces/Song";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent <T extends Song> {;
  songs:Song[]=[];
  @Input() song: Song;
  @Input() position:number;


  @Output() onDeleteSong :EventEmitter<Song> = new EventEmitter;
  @Output() onVoteSong :EventEmitter<Song> = new EventEmitter;
  @Output() editSong = new EventEmitter<number>()
  
  onDelete(song:any){
    console.log(song);
    this.onDeleteSong.emit(song);
  }
  voteSong(song:Song){
    console.log(song);
    this.onVoteSong.emit(song);
  }
}
