import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CusineComponent } from './cusine/cusine.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Restaurant',component:RestaurantComponent},
  {path:'Cusine',component:CusineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,RestaurantComponent,CusineComponent]
