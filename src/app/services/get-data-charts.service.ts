import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponseI } from '../models/weatherResponse';

@Injectable({
  providedIn: 'root'
})
export class GetDataChartsService {

private cityLang: string = 'en';
private cityName: string = 'London';
private unitsFormat: string = 'metric';
private typeSearch: string = 'forecast';
private apiKey: string = 'f609939e60b9916ea2d4e198406f051b';
private urlApi: string = 'http://api.openweathermap.org/data/2.5/';

  constructor(private _http: HttpClient) { }

   public getData(): Observable<WeatherResponseI> {
    return this._http.get<WeatherResponseI>(this.urlApi + this.typeSearch, {
        params: {
            'q': this.cityName,
            'units': this.unitsFormat,
            'lang': this.cityLang,
            'APPID': this.apiKey
        }
    });
  }
}
