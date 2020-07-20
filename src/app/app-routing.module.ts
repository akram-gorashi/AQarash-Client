import { HeaderComponent } from "./components/shared/layout/header/header.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './components/vehicle/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/vehicle/vehicle-details/vehicle-details.component';

const routes: Routes = [
   { path: 'header', component: HeaderComponent},
   { path: '', component: VehicleListComponent},
   { path: 'vehicle-details/:id', component: VehicleDetailsComponent},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})


export class AppRoutingModule { }
