import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { Song } from '../Interfaces/Song';


@Injectable({
	providedIn: 'root'
})
export class SongService {
	updateSongEvent = new EventEmitter<Song>();

	private apiUrl = "http://localhost:3000/songs";

	constructor( private http:HttpClient) { }

	getSongs():Observable<Song[]>{
		return this.http.get<Song[]>(this.apiUrl)
	}

	deleteSong(song:Song):Observable<Song> {
		const url = `${this.apiUrl}/${song.id}`;
		return this.http.delete<Song>(url);
	}

	addSong(song: Song): Observable<Song> {
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this.http.post<Song>(this.apiUrl, song, { headers: headers });
	}
	 
	voteSong(song:Song): Observable<Song> {
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		const url = `${this.apiUrl}/${song.id}`;
		return this.http.patch<Song>(url, song,{ headers: headers })	
	}

	getSongById(id:number): Observable<Song>{
		return this.http.get<Song>(`${this.apiUrl}/${id}`)	
	}

	updateSong(id:number, artist:string, name:string): Observable<Song> {
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		const url = `${this.apiUrl}/${id}`;
		let body = {};		  
		if(artist && name){
			body = {artist, name}
		} else if(artist) {
			body = {artist}
		} else if(name){
			body = {name}}
		return this.http.patch<Song>(url, body, { headers: headers }).pipe(tap((updateSong:Song) => {
			this.updateSongEvent.emit(updateSong);
		}));
	}
}