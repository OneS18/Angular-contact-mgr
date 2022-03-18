import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl: string = `http://localhost:9000`; //json server URL

  constructor(private httpClient: HttpClient) {}

  //get all contacts
  public getAllContacts(): Observable<IContact[]> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient
      .get<IContact[]>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //Get Single Contact
  public getContact(contactId: IContact | string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient
      .get<IContact>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //Create  a contact
  public createContact(contact: IContact): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient
      .post<IContact>(dataURL, contact)
      .pipe(catchError(this.handleError));
  }

  //update contact
  public updateContact(
    contact: IContact,
    contactId: IContact | string
  ): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient
      .put<IContact>(dataURL, contact)
      .pipe(catchError(this.handleError));
  }

  //Delete contacts
  public deleteContact(contactId: string, contact: IContact): Observable<{}> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient
      .delete<{}>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //get All groups
  public getAllGroups(): Observable<IGroup[]> {
    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpClient
      .get<IGroup[]>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //get single group
  public getGroup(contact: IContact): Observable<IGroup> {
    let dataURL: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient
      .get<IGroup>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //error handling
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //client error
      errorMessage = `Error : ${error.error.message}`;
    } else {
      //server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
