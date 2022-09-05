import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private urlService = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'ZB0Tn0euxPlFzT3WRCqTICIQGe0CTlOC';
  private url = `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=dragon ball z&limit=10`;

  public resultados: Gif[] = [];

  get historial () {
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    
  }

  buscarGigs(query: string){

    if(query.trim().length === 0) return;

    query = query.trim().toLowerCase()

    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    const params = new HttpParams()
                        .set('api_key', this.apiKey)
                        .set('limit', '10')
                        .set('q', query)
    
    this.http.get<SearchGifsResponse>(`${this.urlService}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
    })
  }
}
