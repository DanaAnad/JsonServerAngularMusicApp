import { Component,Input, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Song, formError } from 'src/app/Interfaces/Song';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent {
  
  constructor(private songService:SongService){
  }
  
  songs: Song[]=[];
  artist:string="";
  name:string=""
  votes:number = 0;
  entryTopDate:string = new Date().toLocaleString('en-GB').slice(0,17);
  song:Song={id:0, artist:this.artist, name:this.name, votes:this.votes, entryTopDate:this.entryTopDate}
  search: string;
  inputErrors: formError[]=[{artistError:false, songError:false, searchError:false}];
  

  @ViewChild('artistInput') artistName :ElementRef;
  @ViewChild('songInput') songName:ElementRef;
  @ViewChild('searchInput') searchSong:ElementRef;

  @Input() songId :number;
  @Input() isEditMode:boolean = false;
  
  @Output() formInput = new EventEmitter();
  @Output() onAddSong:EventEmitter<Song> = new EventEmitter();
  @Output() searchSongEvent = new EventEmitter<{searchedItem:string}>();
  @Output() applyChanges = new EventEmitter<boolean>();

  ngOnChanges(changes:SimpleChanges){
    if(changes['songId'] && changes['songId'].currentValue){
      this.songService.getSongById(this.songId).subscribe(song =>{
        this.song = song;
        if(this.songName){
          this.songName.nativeElement.focus();
        }
      });
    }
  }

onInput(){
    const artist = this.artistName.nativeElement.value;
    const song = this.songName.nativeElement.value;
    const search = this.searchSong.nativeElement.value;
    if(artist || song) {
      this.formInput.emit();
    }
}

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
    this.applyChanges.emit(true);
  }

  onSubmit(){
    if(!this.name){
      this.inputErrors[0].songError = true;
      return;
     } else this.inputErrors[0].songError=false;
     if(!this.artist){
      this.inputErrors[0].artistError=true;
      return;
     } else this.inputErrors[0].artistError=false;

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

  findSong(searchValue: string){
    if(!this.search){
      this.inputErrors[0].searchError=true;
      return;
    } else this.inputErrors[0].searchError= false;
    const searchedItem = this.searchSong.nativeElement.value = searchValue;
    this.searchSongEvent.emit({searchedItem});
  }
}
