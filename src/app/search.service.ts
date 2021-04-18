import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = 'https://swapi.dev/api/people/';
  constructor(private http: HttpClient) {}
  search(filterText?: string) : Observable<any>{
    filterText = filterText ? encodeURIComponent(filterText) + '/' : '';
    return this.http.get<any>(`${this.url}${filterText}`);
  }
}
