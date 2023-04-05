import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Song } from '../Interfaces/Song';


@Injectable({
	providedIn: 'root'
})
export class SongService {

	// private apiUrl = "http://localhost:5000/songs";
	private apiUrl = "https://jsonserversongs.herokuapp.com/songs"

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
	  
	  
	  
	  
	  


}
 