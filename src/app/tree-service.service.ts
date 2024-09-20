import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreeNode } from './models/tree-node';

@Injectable({
  providedIn: 'root'
})
export class TreeServiceService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Fetch tree data (e.g., employees and orders)
  getTreeData(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.apiUrl);
  }
}
