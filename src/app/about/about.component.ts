import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  
})
export class AboutComponent implements OnInit {
  
  url:string;
  id: string;
  params: any;
  images:[];
  product:any;
  constructor(public router: Router,private apiService: ApiService) { }
 slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "autoplay":true,
    "adaptiveHeight": true,
    "variableWidth": true
  }

  ngOnInit() {
    this.url=this.router.url;
    
    this.params = this.router.parseUrl(this.url).queryParams;
    this.id = this.url.substring(7).toString();
    console.log(this.id);
    this.apiService.sendGetRequestById(this.id).subscribe((res: HttpResponse<any>) => {
      this.product = res;
      this.images = this.product.photos;
      console.log(this.images );
    })
  }
  
}
