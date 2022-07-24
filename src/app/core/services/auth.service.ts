import { environment } from './../../../environments/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpService } from './http.service';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  constructor(protected http: HttpClient) {
    super(http);
  }


  public get currentUser(): User{
    
    const info = localStorage.getItem(environment.localstorage.userKey) || null;
    if (!info) {
      return null;
    }
    const item = JSON.parse(info);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(environment.localstorage.userKey)
      return null
    }
    const user = User.map(item.user);
    return user;
  }


  /**
 * Save user data to localstorage
 * @param key 
 * @param value 
 * @param ttl 
 */
  saveUserInLocalstorage(value: User) {
    const user = localStorage.getItem(environment.localstorage.userKey);
    if (user) {
      localStorage.removeItem(environment.localstorage.userKey);
    }
    const now = new Date();
    const item = {
      user: value,
      expiry: now.getTime() + environment.ttl,
    }
    localStorage.setItem(environment.localstorage.userKey, JSON.stringify(item));
  }

  /**
   * Get authentication
   * @param username 
   * @param password 
   * @returns 
   */
  async login(username: string, password: string): Promise<User | string> {

    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/login_check', { username, password }));
      const user = new User();
      user.token = resp.token;
      this.saveUserInLocalstorage(user);
      return user;
    } catch (error: any) {
      if (error.error.code == 401) {
        return 'Usuario / Password inválido.' as string;
      }
      return 'Ha ocurrido un error. Intente más tarde.' as string;
    }


  }

  logout() {
    localStorage.removeItem('currentUser');
  }


  isLoggedIn(): boolean {
    const currentUser = this.currentUser || null;
    if (currentUser) {
      return true;
    }
    return false;

  }


}
