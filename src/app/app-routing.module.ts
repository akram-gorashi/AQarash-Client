import { HeaderComponent } from "./components/shared/layout/header/header.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   { path: 'header', component: HeaderComponent},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})


export class AppRoutingModule { }
