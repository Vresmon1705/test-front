import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character?page=${page}`);
  }

  getCharacterByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/character?name=${name}`);
  }

  getEpisodeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/episode/${id}`);    
  }

  //

  getCharacterByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
  
  
}
