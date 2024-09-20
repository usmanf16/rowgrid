import { Routes } from '@angular/router';
import { GridsComponent } from './grids/grids.component';
import { HomeComponent } from './home/home.component';

import { ContactComponent } from './contact/contact.component';
import { TestComponent } from './test/test.component';
import { RowwiseComponent } from './rowwise/rowwise.component';
import { TreeviewComponent } from './Tree/treeview/treeview.component';

import { TreetestComponent } from './Tree/treetest/treetest.component';

import { TreeMenuComponent } from './tree-menu/tree-menu.component';



export const routes: Routes = [
    { path: 'grid', component: GridsComponent },
    {path:'home',  component:HomeComponent}, // Define the path here
    {path:'test',component:TestComponent},
    {path:'contact',  component:ContactComponent},
    {path:'rowwise', component:RowwiseComponent},
    {path:'Treeview' , component:TreeviewComponent},
    {path:'tree-menu', component:TreeMenuComponent},
    {path:'treetest', component:TreetestComponent},
    {path:'treeset',component:TreetestComponent},
  


];
