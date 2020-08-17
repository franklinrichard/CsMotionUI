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
  p: number = 1;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.sendGetRequest().subscribe((res: HttpResponse<any>) => {
      //console.log(res);
      // @ts-ignore
      this.items = res.items;
     
    })  
  }
}
