import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      tap(users => {
        if (users && users.length > 0) {
          sessionStorage.setItem('loggedIn', 'true');

        }
      })
    );
  }
}
