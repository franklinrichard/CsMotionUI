import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  
})
export class AboutComponent implements OnInit {
  featuresCollection: any = [];
  url:string;
  id: string;
  params: any;
  images:[];
  product:any;
  featuresGroup: any[] ;
  featureKeys: any;
  constructor(public router: Router,private apiService: ApiService) { }
 slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "autoplay":true,
    "adaptiveHeight": true,
    "variableWidth": true,
 
  }

  ngOnInit() {
    this.url=this.router.url;
    this.params = this.router.parseUrl(this.url).queryParams;
    this.id = this.url.substring(7).toString();
   
    this.apiService.sendGetRequestById(this.id).subscribe((res: HttpResponse<any>) => {
      this.product = res;
      this.images = this.product.photos;
      this.featuresCollection= this.product.features;
      this.featuresGroup=this.groupBy(this.featuresCollection,'group');
      this.featureKeys = Object.keys(this.featuresGroup);
      
    })
  }

   groupBy(OurArray, property) {
  return OurArray.reduce(function (accumulator, object) {
    // get the value of our object(age in our case) to use for group    the array as the array key   
    const key = object[property];
    // if the current value is similar to the key(age) don't accumulate the transformed array and leave it empty  
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    // add the value to the array
    accumulator[key].push(object);
    // return the transformed array
    return accumulator;
    // Also we also set the initial value of reduce() to an empty object
  }, {});
}
  
}
