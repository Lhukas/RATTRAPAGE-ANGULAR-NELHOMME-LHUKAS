import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }


  signup(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
