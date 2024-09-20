import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Simulation } from './interfaces/ITreeMenu';

@Injectable({
  providedIn: 'root'
})
export class TreeMenuService {

  
  private apiUrl = '/api/TreeView/GetTreeStructure'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getSimulations(): Observable<Simulation[]> {
    return this.http.get<Simulation[]>(this.apiUrl);
  }
}
