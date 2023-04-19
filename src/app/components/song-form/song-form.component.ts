import { Component,Input, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Song  } from 'src/app/Interfaces/Song';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent {
  constructor(private songService:SongService){}

  songs: Song[]=[];
  artist:string="";
  name:string=""
  votes:number = 0;
  entryTopDate:string = new Date().toLocaleString('en-GB').slice(0,17);
  song:Song={id:0, artist:this.artist, name:this.name, votes:this.votes, entryTopDate:this.entryTopDate}

  @ViewChild('artistInput') artistName :ElementRef;
  @ViewChild('songInput') songName:ElementRef;

  @Input() songId :number;
  @Output() onAddSong:EventEmitter<Song> = new EventEmitter();
  @Output() searchSongEvent = new EventEmitter<{ artist: string, name: string }>();

 
  ngOnChanges(changes:SimpleChanges){
    console.log(this.songId);
    if(changes['songId'] && changes['songId'].currentValue){
      this.songService.getSongById(this.songId).subscribe(song =>{
        this.song = song;
        if(this.artistName){
          this.artistName.nativeElement.focus();
        }
      });
    }
  }

  ngOnInit():void {
    this.songService.getSongs().subscribe(songs =>this.songs = songs);
  };

  onEditSong(){
    const artist = this.artistName.nativeElement.value;
    const song = this.songName.nativeElement.value;
    this.artist = artist;
    this.name = song;
    this.songService.updateSong(this.songId, this.artist, this.name).subscribe(song => {
      this.song = song;
    });
    this.artist="";
    this.name="";
    this.songService.getSongs().subscribe(songs => (this.songs = songs.sort((a,b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : (a.entryTopDate > b.entryTopDate) ? -1 : (a.entryTopDate < b.entryTopDate) ? 1 : 0)));
  }

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

  submitSearchSong(artistName: string, songName: string) {
    const artist = this.artistName.nativeElement.value;
    const name = this.songName.nativeElement.value;
    this.searchSongEvent.emit({ artist, name });
  }
  
}
