import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token service/token.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

 static totalUnReadMessages=0

  constructor(private _httpClient: HttpClient,
    private tokenService:TokenService
    ) { 

     
    }
private setHeaders(): HttpHeaders {

    let headersConfig =
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-token': this.tokenService.getToken()
    };
    return new HttpHeaders( headersConfig );
  }
  
  
  get(path:string)
  {
      return this._httpClient.get( `${environment.apiUrl}${path}`, { headers: this.setHeaders() } );
  }
  post(path:string, body: Object = {})
    {
        return this._httpClient.post( `${environment.apiUrl}${path}`, body, { headers: this.setHeaders() } );
    }
    put(path:string, body: Object = {})
    {
        return this._httpClient.put( `${environment.apiUrl}${path}`, body, { headers: this.setHeaders() } );
    }
    delete(path:string)
    {
        return this._httpClient.delete( `${environment.apiUrl}${path}`, { headers: this.setHeaders() } );
    }

}