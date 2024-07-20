import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IsPlatformBrowserService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
