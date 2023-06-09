import { Injectable } from '@angular/core';
import { ILoginCredentials } from '../../models/auth/login-credentials.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseEndpoint = '/api/auth';

  constructor(private http: HttpClient) {}

  public login(loginCredentials: ILoginCredentials): Observable<any> {
    return this.http.post(`${this.baseEndpoint}`, loginCredentials);
  }
}
