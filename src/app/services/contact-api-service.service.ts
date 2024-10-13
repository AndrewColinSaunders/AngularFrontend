// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { Contact } from '../Models/contact';

// @Injectable({
//   providedIn: 'root'
// })
// export class ContactApiServiceService {

//   private apiUrl = 'http://localhost:80/api/Contacts'; 

//   constructor(private http: HttpClient) {
//     console.debug("ContactApiServiceService initialized");
//   }

//   private getAuthToken(): string | null {
//     const token = localStorage.getItem('jwt');
//     if (!token) {
//       console.error("JWT token is missing from local storage!");
//     } else {
//       console.log("Retrieved JWT token from local storage:", token);
//     }
//     return token;
//   }

//   private createHeaders(): HttpHeaders {
//     const token = this.getAuthToken();
//     let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
//     if (token) {
//       headers = headers.set('Authorization', `Bearer ${token}`);
//       console.log("Authorization header set with JWT token:", token);
//     } else {
//       console.error("Authorization header not set: Token missing");
//     }

//     return headers;
//   }

//   getContacts(): Observable<Contact[]> {
//     const headers = this.createHeaders();
//     console.log("getContacts triggered - Making GET request to:", this.apiUrl);

//     return this.http.get<Contact[]>(this.apiUrl, { headers }).pipe(
//       tap((response) => {
//         console.log("GET response received:", response);
//       }),
//       catchError((error) => {
//         console.error("Error occurred while fetching contacts:", error);
//         console.error("Error Status Code:", error.status);
//         console.error("Error Details:", error.message);
//         return throwError(() => new Error("Error fetching contacts. Details: " + error.message));
//       })
//     );
//   }
  
//   getContactById(id: number): Observable<Contact> {
//     const headers = this.createHeaders();
//     const url = `${this.apiUrl}/${id}`;
//     console.debug("getContactById triggered - Making GET request to:", url);

//     return this.http.get<Contact>(url, { headers }).pipe(
//       tap((contact) => {
//         console.debug("GET contact by id received:", contact);
//       }),
//       catchError((error) => {
//         console.error(`Error occurred while fetching contact by id: ${id}`, error);
//         console.error("Error Status Code:", error.status);
//         console.error("Error Details:", error.message);
//         return throwError(() => new Error(`Error fetching contact with ID ${id}. Details: ${error.message}`));
//       })
//     );
//   }

//   addContact(contact: Contact): Observable<Contact> {
//     const headers = this.createHeaders();
//     console.log("addContact triggered - Sending payload to API:", JSON.stringify(contact));

//     return this.http.post<Contact>(this.apiUrl, contact, { headers }).pipe(
//       tap((newContact) => {
//         console.debug("Contact added successfully:", newContact);
//       }),
//       catchError((error) => {
//         console.error("Error occurred while adding contact:", error);
//         console.error("Error Status Code:", error.status);
//         console.error("Error Details:", error.message);
//         return throwError(() => new Error("Error adding contact. Details: " + error.message));
//       })
//     );
//   }

//   updateContact(id: number, contact: Contact): Observable<void> {
//     const headers = this.createHeaders();
//     const url = `${this.apiUrl}/${id}`;
//     console.debug("updateContact triggered - Submitting PUT request to:", url);
//     console.debug("Payload being sent:", JSON.stringify(contact));

//     return this.http.put<void>(url, contact, { headers }).pipe(
//       tap(() => {
//         console.debug(`Contact with ID ${id} updated successfully.`);
//       }),
//       catchError((error) => {
//         console.error(`Error occurred while updating contact with ID ${id}`, error);
//         console.error("Error Status Code:", error.status);
//         console.error("Error Details:", error.message);
//         return throwError(() => new Error(`Error updating contact with ID ${id}. Details: ${error.message}`));
//       })
//     );
//   }

//   deleteContact(id: number): Observable<void> {
//     const headers = this.createHeaders();
//     const url = `${this.apiUrl}/${id}`;
//     console.debug(`deleteContact triggered - Deleting contact with ID: ${id}`);

//     return this.http.delete<void>(url, { headers }).pipe(
//       tap(() => console.debug(`Contact with ID ${id} deleted successfully.`)),
//       catchError((error) => {
//         console.error(`Error occurred while deleting contact with ID ${id}`, error);
//         console.error("Error Status Code:", error.status);
//         console.error("Error Details:", error.message);
//         return throwError(() => new Error(`Error deleting contact with ID ${id}. Details: ${error.message}`));
//       })
//     );
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Contact } from '../Models/contact';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ContactApiServiceService {

  constructor(
    private http: HttpClient,
    private config: AppConfigService
  ) {
    console.debug("ContactApiServiceService initialized");
  }

  private getAuthToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error("JWT token is missing from local storage!");
    } else {
      console.log("Retrieved JWT token from local storage:", token);
    }
    return token;
  }

  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log("Authorization header set with JWT token:", token);
    } else {
      console.error("Authorization header not set: Token missing");
    }

    return headers;
  }

  getContacts(): Observable<Contact[]> {
    const headers = this.createHeaders();
    console.log("getContacts triggered - Making GET request to:", this.config.contactsUrl);

    return this.http.get<Contact[]>(this.config.contactsUrl, { headers }).pipe(
      tap((response) => {
        console.log("GET response received:", response);
      }),
      catchError((error) => {
        console.error("Error occurred while fetching contacts:", error);
        console.error("Error Status Code:", error.status);
        console.error("Error Details:", error.message);
        return throwError(() => new Error("Error fetching contacts. Details: " + error.message));
      })
    );
  }
  
  getContactById(id: number): Observable<Contact> {
    const headers = this.createHeaders();
    const url = `${this.config.contactsUrl}/${id}`;
    console.debug("getContactById triggered - Making GET request to:", url);

    return this.http.get<Contact>(url, { headers }).pipe(
      tap((contact) => {
        console.debug("GET contact by id received:", contact);
      }),
      catchError((error) => {
        console.error(`Error occurred while fetching contact by id: ${id}`, error);
        console.error("Error Status Code:", error.status);
        console.error("Error Details:", error.message);
        return throwError(() => new Error(`Error fetching contact with ID ${id}. Details: ${error.message}`));
      })
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    const headers = this.createHeaders();
    console.log("addContact triggered - Sending payload to API:", JSON.stringify(contact));

    return this.http.post<Contact>(this.config.contactsUrl, contact, { headers }).pipe(
      tap((newContact) => {
        console.debug("Contact added successfully:", newContact);
      }),
      catchError((error) => {
        console.error("Error occurred while adding contact:", error);
        console.error("Error Status Code:", error.status);
        console.error("Error Details:", error.message);
        return throwError(() => new Error("Error adding contact. Details: " + error.message));
      })
    );
  }

  updateContact(id: number, contact: Contact): Observable<void> {
    const headers = this.createHeaders();
    const url = `${this.config.contactsUrl}/${id}`;
    console.debug("updateContact triggered - Submitting PUT request to:", url);
    console.debug("Payload being sent:", JSON.stringify(contact));

    return this.http.put<void>(url, contact, { headers }).pipe(
      tap(() => {
        console.debug(`Contact with ID ${id} updated successfully.`);
      }),
      catchError((error) => {
        console.error(`Error occurred while updating contact with ID ${id}`, error);
        console.error("Error Status Code:", error.status);
        console.error("Error Details:", error.message);
        return throwError(() => new Error(`Error updating contact with ID ${id}. Details: ${error.message}`));
      })
    );
  }

  deleteContact(id: number): Observable<void> {
    const headers = this.createHeaders();
    const url = `${this.config.contactsUrl}/${id}`;
    console.debug(`deleteContact triggered - Deleting contact with ID: ${id}`);

    return this.http.delete<void>(url, { headers }).pipe(
      tap(() => console.debug(`Contact with ID ${id} deleted successfully.`)),
      catchError((error) => {
        console.error(`Error occurred while deleting contact with ID ${id}`, error);
        console.error("Error Status Code:", error.status);
        console.error("Error Details:", error.message);
        return throwError(() => new Error(`Error deleting contact with ID ${id}. Details: ${error.message}`));
      })
    );
  }
}
