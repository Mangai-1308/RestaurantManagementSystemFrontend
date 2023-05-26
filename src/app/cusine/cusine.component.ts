import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/internal/operators/map';
import { Restaurant } from '../models/restaurant';

@Component({
  selector: 'app-cusine',
  templateUrl: './cusine.component.html',
  styleUrls: ['./cusine.component.css']
})
export class CusineComponent {
  constructor(private router: Router, private http:HttpClient){}

  allRestaurant: Restaurant[] = [];

  type_of_cusine = '';

  errorshow = true;

  onClickIndian() {
    this.type_of_cusine = 'Indian'; 
    this.fetchRestaurant();
  }

  onClickItalian() {
    this.type_of_cusine = 'Italian';
    this.fetchRestaurant();
  }

  onClickChinese() {
    this.type_of_cusine = 'Chinese';
    this.fetchRestaurant();
  }



  private fetchRestaurant(){
    this.http.get<{[key: string]: Restaurant}>('https://localhost:7135/api/Restaurant')
    .pipe(map((res) => {
      const restaurant = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          restaurant.push({...res[key], id: key});
        }
        }
        return restaurant;
    }))
    .subscribe((restaurant)=>{
      if(Array.isArray(restaurant)){
        const filtereddata = restaurant.filter((item: { type_of_cusine: string; }) => item.type_of_cusine === this.type_of_cusine);
        console.log(filtereddata);
        this.allRestaurant = filtereddata;
        }
    },error =>{
      this.errorshow=false;
     })
  }
}
