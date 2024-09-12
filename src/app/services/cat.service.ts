import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<any> {
    return this.http.get(`${this.apiUrl}/breeds`);
  }

  searchBreeds(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/breeds/search?q=${query}`);
  }
  
  getImagesByBreedId(breedId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/imagesbybreedid/${breedId}`);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/login`, { params: { username, password } });
  }

}
