import { Routes } from '@angular/router';
import { GridsComponent } from './grids/grids.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: 'grid', component: GridsComponent },
    {path:'home',  component:HomeComponent}, // Define the path here
    {path:'about',component:AboutComponent},
    {path:'contact',  component:ContactComponent}

];
