import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  private SERVER_URL = "http://localhost:3000/Products"; 
  private SERVER_URL1 = "https://localhost:5001/cars/listings"
  private SERVER_URL2 = "https://localhost:5001/cars/details"

  constructor(private httpClient: HttpClient) { }
  

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

   public sendGetRequest() {
    // Add safe, URL encoded _page and _limit parameters 
     var resp = this.httpClient.get(this.SERVER_URL1);
     console.log(resp);
     return this.httpClient.get(this.SERVER_URL1);
  }

  public sendGetRequestById(id:string) {
    // Add safe, URL encoded _page and _limit parameters 
    var resp = this.httpClient.get(this.SERVER_URL2 + "/" + id);
    console.log(this.SERVER_URL2 + "/" + id);
    console.log(resp);
    return this.httpClient.get(this.SERVER_URL2 + "/" + id);
  }



  // public sendGetRequest() {
  //   // Add safe, URL encoded _page and _limit parameters 

  //   return this.httpClient.get(this.SERVER_URL1, { params: new HttpParams({ fromString: "_page=1&_limit=5" }), observe: "response" }).pipe(retry(3), catchError(this.handleError), tap(res => {
  //     console.log(res.headers.get('Link'));
  //     this.parseLinkHeader(res.headers.get('Link'));
  //   }));
  // }
  

  // public sendGetRequestById(id:string) {
  //   // Add safe, URL encoded _page and _limit parameters 

  //   return this.httpClient.get(this.SERVER_URL2+id, { params: new HttpParams(), observe: "response" }).pipe(retry(3), catchError(this.handleError), 
  //   tap(res => { }));
  // }
  

  public sendGetRequestToUrl(id: string) {
    return this.httpClient.get(id, { observe: "response" }).pipe(retry(3),
      catchError(this.handleError), tap(res => {
       
        this.parseLinkHeader(res.headers.get('Link'));
      }));
  }
    

  parseLinkHeader(header) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach(p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first = links["first"];
    this.last = links["last"];
    this.prev = links["prev"];
    this.next = links["next"];
  }
}
