import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNewsService {

private country: string = 'gb';
private apiKey: string = '9c8122d30d7a4381bec0062a777cc51e';
private urlApi: string = 'http://newsapi.org/v2/top-headlines?';

  constructor(private _http: HttpClient) { }

   public getData(): Observable<any> {
    return this._http.get<any>(this.urlApi, {
        params: {
            'country': this.country,
            'apiKey': this.apiKey,
        }
    });
  }
}
