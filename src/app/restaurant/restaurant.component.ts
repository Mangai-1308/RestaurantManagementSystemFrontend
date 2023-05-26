import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/internal/operators/map';
import { Restaurant } from '../models/restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  constructor(private router: Router,private http:HttpClient){
    
    
  }
 
  searchTerm: string = '';
  restaurant_name: string = '';

  type_of_food: string;
  allRestaurant: Restaurant[] = [];
  errorshow = true;
  errorshowmsg = true;
  isloading = true;

  onLoad(){
    this.isloading = false;
    this.allRestaurant =[];
  }

  onClickfood(type_of_food: string){
    this.type_of_food = type_of_food; 
    this.restaurantFetch();
  }

  onClick(){
    this.fetchRestaurant();
  }

  onSearch(){
    console.log(this.searchTerm);
    this.restaurantFetch();
  }

  
  onRestaurantFetch(){
    this.fetchRestaurant();
  }


  

  private fetchRestaurant(){
    this.errorshow=true;
    this.errorshowmsg=true;
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
      console.log(restaurant);
      
      this.allRestaurant = restaurant;
    },error =>{
      this.allRestaurant = [];
      this.errorshow=false;
     })
    
  }

  private restaurantFetch(){
    this.errorshow=true;
    this.errorshowmsg=true;
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
        const filtereddata = restaurant.filter((item: { res_name: string; type_of_food: string; }) => item.res_name === this.searchTerm || item.type_of_food === this.type_of_food);
        if(filtereddata.length == 0){
          this.errorshowmsg=false;
        }else{
        console.log(filtereddata);
        
        this.allRestaurant = filtereddata;
        }
        }
    },error =>{
      this.errorshow=false;
     })
    
  }


  
}





