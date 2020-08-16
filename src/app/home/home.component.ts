import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items :any=[];
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.sendGetRequest().subscribe((res: HttpResponse<any>) => {
      //console.log(res);
      // @ts-ignore
      this.items = res.items;
      //console.log(res.headers);
      console.log(this.items)


      
    })  
  }
   















  public firstPage() {
    this.items = [];
    this.apiService.sendGetRequestToUrl(this.apiService.first).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.items = res.body;
    })
  }
  public previousPage() {

    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.items = [];
      this.apiService.sendGetRequestToUrl(this.apiService.prev).subscribe((res: HttpResponse<any>) => {
        
        this.items = res.body;
      })
    }

  }
  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.items = [];
      this.apiService.sendGetRequestToUrl(this.apiService.next).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.items = res.body;
      })
    }
  }
  public lastPage() {
    this.items = [];
    this.apiService.sendGetRequestToUrl(this.apiService.last).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.items = res.body;
    })
  }

}
