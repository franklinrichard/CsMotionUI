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
 
  //Mock URL . Refer Readme for details
  //private SERVER_URL = "http://localhost:3000/Products"; 
  //
  private Car_List_URL = "https://localhost:5001/cars/listings"
  private Car_Details_URL = "https://localhost:5001/cars/details"

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
     var resp = this.httpClient.get(this.Car_List_URL);
     console.log(resp);
     return this.httpClient.get(this.Car_List_URL);
  }

  public sendGetRequestById(id:string) {
    // Add safe, URL encoded _page and _limit parameters 
    var resp = this.httpClient.get(this.Car_Details_URL + "/" + id);
    console.log(this.Car_Details_URL + "/" + id);
    console.log(resp);
    return this.httpClient.get(this.Car_Details_URL + "/" + id);
  }



  

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
