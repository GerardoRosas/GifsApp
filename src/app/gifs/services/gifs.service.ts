import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = 'ZB0Tn0euxPlFzT3WRCqTICIQGe0CTlOC';
  private url = `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=dragon ball z&limit=10`;

  public resultados: Gif[] = [];

  get historial () {
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ) { }

  buscarGigs(query: string){

    if(query.trim().length === 0) return;

    query = query.trim().toLowerCase()

    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(resp);
        this.resultados = resp.data;
    })
  }
}
