import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API}/me`);
  }

  updateCurrentUser(name: string): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.API}/me`, { name });
  }
}
