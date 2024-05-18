import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { UserModel } from '../store/user/User.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _HttpClient:HttpClient, private cacheService: CacheService) { }


  // get users method
  getUsers(pageNumber:any):Observable<UserModel[]> {
    const cacheKey = `users-${pageNumber}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    } else {
      return this._HttpClient.get<any>(`https://reqres.in/api/users?page=${pageNumber}`)
      .pipe(
        map(response => response), 
        tap(data => {
          this.cacheService.set(cacheKey, data);
        })
      );
    }
  }

// get single user method
  getUserById(userId:any):Observable<any> {
    const cacheKey = `users/${userId}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    } else {
      return this._HttpClient.get<any>(`https://reqres.in/api/users/${userId}`).pipe(
        map(response => response.data), 
        tap(data => {
          this.cacheService.set(cacheKey, data);
        })
      );
    }
  }


}
