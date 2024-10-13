import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  readonly apiBaseUrl: string = 'http://localhost:80/api';
  
  readonly authUrl: string = `${this.apiBaseUrl}/auth`;
  readonly contactsUrl: string = `${this.apiBaseUrl}/Contacts`;

  constructor() {}
}
