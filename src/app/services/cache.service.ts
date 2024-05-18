import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  private cache = new Map<string, any>();

  // Set data to cache
  set(key: string, data: any): void {
    this.cache.set(key, data);
  }

  // Get data from cache
  get(key: string): any {
    return this.cache.get(key);
  }

  // Check if the key exists in cache
  has(key: string): boolean {
    return this.cache.has(key);
  }
}
