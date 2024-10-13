// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { jwtDecode } from "jwt-decode";

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   // private apiUrl = 'https://localhost:7179/api/auth';
//   private apiUrl = 'http://localhost:80/api/auth';


//   constructor(private http: HttpClient, private router: Router) {}

//   register(username: string, password: string): Promise<any> {
//     return this.http.post(`${this.apiUrl}/register`, { username, password }, { 
//         observe: 'response', 
//         responseType: 'text' 
//       })
//       .toPromise()
//       .then((response) => {
//         if (response?.status === 201) {
//           console.log('User registered successfully:', response.body);
//           return response.body;
//         } else {
//           console.error('Unexpected response status:', response?.status);
//           return null;
//         }
//       })
//       .catch((error) => {
//         console.error('Registration error:', error);
//         return Promise.reject(error);
//       });
//   }

//   login(username: string, password: string): Promise<boolean> {
//     return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
//       .toPromise()
//       .then((response) => {
//         if (response && response.token) { 
//           const token = response.token;
//           this.storeToken(token);
//           return true; 
//         } else {
//           console.error('Login failed: No token returned in the response.');
//           return false; 
//         }
//       })
//       .catch((error) => {
//         console.error('Login error:', error);
//         return false; 
//       });
//   }

//   getToken(): string | null {
//     const token = localStorage.getItem('jwt');
//     if (token && this.isTokenExpired(token)) {
//       console.warn('JWT token is expired.');
//       this.logout();
//       return null;
//     }
//     console.log('Retrieved JWT from localStorage:', token);  
//     return token;
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   logout(): void {
//     console.debug('Logging out and removing JWT from localStorage');
//     localStorage.removeItem('jwt');
//     this.router.navigate(['/login']);
//   }

//   private storeToken(token: string): void {
//     localStorage.setItem('jwt', token);
//     console.log('JWT successfully stored in localStorage:', token);
//   }

//   private isTokenExpired(token: string): boolean {
//     try {
//       const decodedToken: any = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       return decodedToken.exp < currentTime;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       return true; 
//     }
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private config: AppConfigService
  ) {}

  register(username: string, password: string): Promise<any> {
    return this.http.post(`${this.config.authUrl}/register`, { username, password }, { 
        observe: 'response', 
        responseType: 'text' 
      })
      .toPromise()
      .then((response) => {
        if (response?.status === 201) {
          console.log('User registered successfully:', response.body);
          return response.body;
        }
        return null;
      })
      .catch((error) => {
        console.error('Registration error:', error);
        return Promise.reject(error);
      });
  }

  login(username: string, password: string): Promise<boolean> {
    return this.http.post<{ token: string }>(`${this.config.authUrl}/login`, { username, password })
      .toPromise()
      .then((response) => {
        if (response && response.token) { 
          this.storeToken(response.token);
          return true; 
        }
        return false; 
      })
      .catch((error) => {
        console.error('Login error:', error);
        return false; 
      });
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (token && this.isTokenExpired(token)) {
      console.warn('JWT token is expired.');
      this.logout();
      return null;
    }
    return token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  private storeToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; 
    }
  }
}
